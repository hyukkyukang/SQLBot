"use client";
import { useChatContext } from "@/context/chatContext";
import { useDatabaseContext } from "@/context/databaseContext";
import { useQueryResultContext } from "@/context/queryResultContext";
import { MessageType } from "@/lib/message/types";
import { SQLBotMessageToMessageModel, filterMessagesByType, filterUserMessages } from "@/lib/message/utils";
import { useTranslatedSQLByQuestion } from "@/lib/model/text2sql/get";
import { useSummarizationFromTable } from "@/lib/model/table2text/get";
import { useResultByQuery } from "@/lib/query/get";
import { Button, ChatContainer, MainContainer, Message, MessageInput, MessageList, MessageSeparator, SendButton, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useEffect, useMemo, useState } from "react";
import { BsFillEraserFill } from "react-icons/bs";
import striptags from 'striptags';
import { summarizationInput } from "@/lib/model/table2text/type";

const typingIndicator = <TypingIndicator content="SQLBot is thinking" />;
const SESSION_END_INTENTS = ["thank_you", "affirm"];

export default function ChatWindow() {
    const { messages, setMessages } = useChatContext();
    const { selectedDB } = useDatabaseContext();
    const { setQueryResult } = useQueryResultContext();
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [resetSession, setResetSession] = useState<boolean>(false);
    const chatScopeMessages = useMemo(() => messages.map(SQLBotMessageToMessageModel), [messages]);
    const SQLMessages = useMemo(() => filterMessagesByType(messages, MessageType.isSQL), [messages]);
    const userMessages = useMemo(() => filterUserMessages(messages), [messages]);

    const queryResult = useResultByQuery(selectedDB, SQLMessages[SQLMessages.length -1]?.message);
    const translationResult = useTranslatedSQLByQuestion(selectedDB, userMessages[userMessages.length - 1]?.message)
    const summarizationResult = useSummarizationFromTable(queryResult.data as unknown as summarizationInput);


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
        setIsWaiting(true);
        setInputMessage("");
    };

    // Reset message if the selected database is changed
    useEffect(() => {
        setMessages([]);
    }, [selectedDB]);

    
    // Add table summary message
    useEffect(() => {
        // Check if last message isSQL query and query result is not empty
        console.log(`summarizationResult.data: ${JSON.stringify(summarizationResult.data)}`);
        if (summarizationResult.data && queryResult.data && queryResult.data.length > 0 && messages[messages.length-1].type == MessageType.isSQL) {
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
        }
    }, [messages, queryResult.data, summarizationResult.data]);

    // Add session reset message
    useEffect(() => {
        if (resetSession) {
            setMessages([
                ...messages,
            ]);
            setResetSession(false);
        }
    }, [resetSession]);

    // Handle the translation response from the backend server 
    useEffect(() => {
        if(translationResult.data && isWaiting) {
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
            if (!SESSION_END_INTENTS.includes(translationResult.data.user_intent)) {
                newMessages.push({
                    message: translationResult.data.pred_sql,
                    confidence: translationResult.data.confidence,
                    type: MessageType.isSQL,
                    intent: "none",
                });
            }

            setMessages(newMessages);
            setIsWaiting(false);
        }

    }, [selectedDB, setQueryResult, translationResult.data, isWaiting])

    // Handle the execution response from the backend server 
    useEffect(() => {
        if (queryResult.data) {
            setQueryResult(queryResult.data);
        }
        else if (queryResult.data == undefined || queryResult.data == null) {
            setQueryResult([]);
        }
    }, [selectedDB, setQueryResult, queryResult.data]);

    return (
        <React.Fragment>
            <div style={{ position: "relative", height: "500px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={isWaiting ? typingIndicator : null}>
                            {chatScopeMessages.map((message, idx) => (
                                <Message key={idx} model={message}>
                                    <Message.Footer sentTime={message.sentTime} />
                                </Message>
                            ))}
                            {chatScopeMessages.length > 1 && SESSION_END_INTENTS.includes(chatScopeMessages[chatScopeMessages.length - 1].sentTime as string) ? <MessageSeparator content="End of session" /> : null}
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

