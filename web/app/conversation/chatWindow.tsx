"use client";
import { useChatContext, SOLBotMessage } from "@/context/chatContext";
import { ChatContainer, MainContainer, Message, MessageInput, MessageList, MessageModel, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useState, useMemo } from "react";

const typingIndicator = <TypingIndicator content="SQLBot is thinking" />;

function SQLBotMessageToMessageModel(message: SOLBotMessage): MessageModel {
    return {
        message: message.message,
        direction: message.isUser ? "outgoing" : "incoming",
    } as MessageModel;
}

export default function ChatWindow() {
    const { messages, setMessages } = useChatContext();
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const chatScopeMessages = useMemo(() => messages.map(SQLBotMessageToMessageModel), [messages]);

    const inputHandler = (value: string) => {
        console.log(`User sent message: ${value}`);
        setMessages([
            ...messages,
            {
                message: value,
                isUser: true,
            },
        ]);
        setIsWaiting(true);
    };

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
