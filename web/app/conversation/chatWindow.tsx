"use client";
import { useChatContext } from "@/context/chatContext";
import { useDatabaseContext } from "@/context/databaseContext";
import { useQueryResultContext } from "@/context/queryResultContext";
import { SQLBotMessageToMessageModel, filterUserMessages, filterSystemMessages } from "@/lib/message/utils";
import { useResultByQuery } from "@/lib/query/get";
import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslatedSQLByQuestion } from "@/lib/model/get";

const typingIndicator = <TypingIndicator content="SQLBot is thinking" />;


export default function ChatWindow() {
    const { messages, setMessages } = useChatContext();
    const { selectedDB } = useDatabaseContext();
    const { setQueryResult } = useQueryResultContext();
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const chatScopeMessages = useMemo(() => messages.map(SQLBotMessageToMessageModel), [messages]);
    const systemMessages = useMemo(() => filterSystemMessages(messages), [messages]);
    const userMessages = useMemo(() => filterUserMessages(messages), [messages]);

    const queryResult = useResultByQuery(selectedDB, systemMessages[systemMessages.length - 1]?.message);
    const modelResult = useTranslatedSQLByQuestion(selectedDB, userMessages[userMessages.length - 1]?.message)


    const inputHandler = (value: string) => {
        // Make request to the backend server
        setMessages([
            ...messages,
            {
                message: value,
                isUser: true,
            },
        ]);
        setIsWaiting(true);
    };

    // Handle the translation response from the backend server 
    useEffect(() => {
        if(modelResult.data) {
            setMessages([
                ...messages,
                {
                    message: modelResult.data["pred_sql"],
                    isUser: false,
                },
            ]);
            setIsWaiting(false);
        }

    }, [selectedDB, setQueryResult, modelResult.data])

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
                                <Message key={idx} model={message} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={inputHandler} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </React.Fragment>
    );
}
