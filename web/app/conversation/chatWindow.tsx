"use client";
import { SOLBotMessage, useChatContext } from "@/context/chatContext";
import { useDatabaseContext } from "@/context/databaseContext";
import { getResultByQuery } from "@/lib/query/get";
import { ChatContainer, MainContainer, Message, MessageInput, MessageList, MessageModel, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useEffect, useMemo, useState } from "react";
import { useQueryResultContext } from "@/context/queryResultContext";

const typingIndicator = <TypingIndicator content="SQLBot is thinking" />;

function SQLBotMessageToMessageModel(message: SOLBotMessage): MessageModel {
    return {
        message: message.message,
        direction: message.isUser ? "outgoing" : "incoming",
    } as MessageModel;
}

export default function ChatWindow() {
    const { messages, setMessages } = useChatContext();
    const { selectedDB } = useDatabaseContext();
    const { setQueryResult } = useQueryResultContext();
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const chatScopeMessages = useMemo(() => messages.map(SQLBotMessageToMessageModel), [messages]);

    const { data, isLoading, isError } = getResultByQuery(selectedDB, messages[messages.length - 1]?.message);

    const inputHandler = (value: string) => {
        setMessages([
            ...messages,
            {
                message: value,
                isUser: true,
            },
        ]);
        setIsWaiting(true);
    };

    useEffect(() => {
        if (data) {
            setQueryResult(data);
        }
        else if (data == undefined || data == null) {
            setQueryResult([]);
        }
    }, [selectedDB, data]);

    return (
        <React.Fragment>
            <div style={{ position: "relative", height: "500px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={isWaiting ? typingIndicator : null}>
                            {chatScopeMessages.map((message) => (
                                <Message model={message} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={inputHandler} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </React.Fragment>
    );
}
