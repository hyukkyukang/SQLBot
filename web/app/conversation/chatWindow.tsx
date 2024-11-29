"use client";
import { useChatContext } from "@/context/chatContext";
import { useDatabaseContext } from "@/context/databaseContext";
import { useQueryResultContext } from "@/context/queryResultContext";
import { MessageType, RESET_MESSAGE } from "@/lib/message/types";
import { SQLBotMessageToMessageModel, filterMessagesByType, filterUserMessages } from "@/lib/message/utils";
import { useSummarizationFromTable } from "@/lib/model/table2text/get";
import { summarizationInput } from "@/lib/model/table2text/type";
import { useResetTranslationHistory, useTranslatedSQLByQuestion } from "@/lib/model/text2sql/get";
import { useResultByQuery } from "@/lib/query/get";
import { Button, ChatContainer, MainContainer, Message, MessageInput, MessageList, MessageSeparator, SendButton, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useEffect, useMemo, useState } from "react";
import { BsFillEraserFill } from "react-icons/bs";
import striptags from 'striptags';

const WELCOME_MESSAGE = "Hi, I'm SQLBot. I can help you to query the database using natural language. Please select a database to start.";
const SYSTEM_END_MESSAGE = "You're welcome! If you have any more questions or need further assistance, feel free to ask.";
const typingIndicator = <TypingIndicator content="SQLBot is thinking" />;
const SESSION_END_INTENTS = ["thank_you", "affirm"];

export default function ChatWindow() {
    const { messages, setMessages } = useChatContext();
    const { selectedDB } = useDatabaseContext();
    const { setQueryResult } = useQueryResultContext();
    const [isWaitingTranslation, setIsWaitingTranslation] = useState<boolean>(false);
    const [isWaitingSummarization, setIsWaitingSummarization] = useState<boolean>(false);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [resetSession, setResetSession] = useState<boolean>(false);
    const chatScopeMessages = useMemo(() => messages.map(SQLBotMessageToMessageModel), [messages]);
    const SQLMessages = useMemo(() => filterMessagesByType(messages, MessageType.isSQL), [messages]);
    const userMessages = useMemo(() => filterUserMessages(messages), [messages]);

    const localQueryResult = useResultByQuery(selectedDB, SQLMessages[SQLMessages.length -1]?.message);
    const translationResult = useTranslatedSQLByQuestion(selectedDB, userMessages[userMessages.length - 1]?.message, messages[messages.length - 2]?.message == RESET_MESSAGE)
    const summarizationResult = useSummarizationFromTable(localQueryResult.data as unknown as summarizationInput);
    const tmpResetResponse = useResetTranslationHistory(resetSession);

    const messageInputOnChange = (value: string) => {
        const valueWithoutHTML = striptags(value).replace('&gt;', '>').replace('&lt;', '<');
        const valueWithoutHTML_ = valueWithoutHTML.replace(/ &nbsp;/g, ' ');
        setInputMessage(valueWithoutHTML_);
      };

    const inputHandler = () => {
        // Make request to the backend server
        setMessages([
            ...messages,
            {
                message: inputMessage,
                confidence: 100,
                type: MessageType.isUser,
                intent: null,
            },
        ]);
        setIsWaitingTranslation(true);
        setInputMessage("");
    };

    // Reset message if the selected database is changed
    useEffect(() => {
        if(selectedDB){
            setMessages([{
                message: WELCOME_MESSAGE,
                confidence: 100,
                type: MessageType.isSystemMessage,
                intent: null,
            },{
                message: `You have selected "${selectedDB}" database. Please ask me a question.`,
                confidence: 100,
                type: MessageType.isSystemMessage,
                intent: null,
            }]);
        }
        else{
            setMessages([{
                message: WELCOME_MESSAGE,
                confidence: 100,
                type: MessageType.isSystemMessage,
                intent: null,
            }]);
        }
    }, [selectedDB, setMessages]);

    // unset reset session flag if the reset session response is received
    useEffect(() => {
        if(tmpResetResponse.data){
            setResetSession(false);
        }
    }, [setResetSession, tmpResetResponse]);

    
    // Add table summary message
    useEffect(() => {
        // Check if last message isSQL query and query result is not empty
        if (isWaitingSummarization && summarizationResult.data && localQueryResult.data) {
            // Request summarization from the backend server
            setMessages([
                ...messages,
                {
                    message: summarizationResult.data.summary,
                    confidence: 100,
                    type: MessageType.isResultSummary,
                    intent: null,
                }
            ]);
            setIsWaitingSummarization(false);
        }
    }, [messages, setMessages, isWaitingSummarization, setIsWaitingSummarization, localQueryResult.data, summarizationResult.data]);

    // Add session reset message
    useEffect(() => {
        if (resetSession) {
            setMessages([
                ...messages,
                {
                    message: RESET_MESSAGE,
                    confidence: 100,
                    type: MessageType.isSystemMessage,
                    intent: null,
                }
            ]);
            setResetSession(false);
        }
    }, [messages, setMessages, resetSession]);

    // Handle the translation response from the backend server 
    useEffect(() => {
        if(translationResult.data && isWaitingTranslation) {
            const newMessages = [
                ...messages.slice(0, -1),
                // Correct the last user message with predicted intent
                {
                    message: messages[messages.length - 1].message,
                    confidence: 100,
                    type: MessageType.isUser,
                    intent: translationResult.data.user_intent,
                },
            ];
            // Add system message only if the user intent is not "thank_you"
            if (SESSION_END_INTENTS.includes(translationResult.data.user_intent)) {
                newMessages.push({
                    message: SYSTEM_END_MESSAGE,
                    confidence: 100,
                    type: MessageType.isSystemMessage,
                    intent: "none",
                });
                setResetSession(true);
            }
            else {
                newMessages.push({
                    message: translationResult.data.pred_sql,
                    confidence: translationResult.data.confidence,
                    type: MessageType.isSQL,
                    intent: "none",
                });
                // Add recommendation message if the confidence is low
                if (translationResult.data.confidence < 70) {
                    console.log(`translationResult.data.analyse_result.raw_input: ${translationResult.data.analyse_result.raw_input}`)
                    newMessages.push({
                        message: `I'm not sure if I understand your question. Are you sure you mean "${translationResult.data.analyse_result.raw_input}"?`,
                        confidence: 100,
                        type: MessageType.isSystemMessage,
                        intent: "none",
                    });
                    setIsWaitingSummarization(false);
                }
                else{
                    setIsWaitingSummarization(true);
                }
            }

            setMessages(newMessages);
            setIsWaitingTranslation(false);
        }

    }, [selectedDB, messages, setMessages, setQueryResult, translationResult.data, isWaitingTranslation])

    // Handle the execution response from the backend server 
    useEffect(() => {
        if (localQueryResult.data) {
            setQueryResult(localQueryResult.data);
        }
        else if (localQueryResult.data == undefined || localQueryResult.data == null) {
            setQueryResult(null);
        }
    }, [selectedDB, setQueryResult, localQueryResult.data]);

    return (
        <React.Fragment>
            <div style={{ position: "relative", height: "500px",paddingLeft: "20px", paddingRight: "20px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={isWaitingTranslation || isWaitingSummarization ? typingIndicator : null}>
                            {chatScopeMessages.map((message, idx) => (
                                message.message == RESET_MESSAGE
                                ?
                                <MessageSeparator key={idx} content="End of session" />
                                :
                                <Message key={idx} model={message} >
                                    <Message.Footer sentTime={message.sentTime} />
                                </Message>
                                
                            ))}
                        </MessageList>

                        {/* My own style message input component */}
                        <div is={"MessageInput"}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                borderTop: "1px dashed #d1dbe4"
                            }}>
                            <MessageInput
                                style={{
                                flexGrow: 1,
                                borderTop: 0,
                                flexShrink: "initial"
                                }}
                                placeholder="Natural Language Query"
                                value={inputMessage}
                                onChange={messageInputOnChange}
                                onSend={inputHandler}
                                sendButton={false} attachButton={false} />
                            <SendButton
                                style={{
                                fontSize: "1.2em",
                                marginLeft: 0,
                                paddingLeft: "0.2em",
                                paddingRight: "0.2em"
                                }}
                                onClick={inputHandler}
                                disabled={false} />
                            <Button
                                style={{
                                fontSize: "1.2em",
                                marginLeft: 0,
                                paddingLeft: "0.2em",
                                paddingRight: "0.2em"
                                }}
                                onClick={() => setResetSession(true)}>
                                <BsFillEraserFill />
                            </Button>
                            </div>
                    </ChatContainer>
                </MainContainer>
            </div>
        </React.Fragment>
    );
}

