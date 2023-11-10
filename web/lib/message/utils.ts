import { SOLBotMessage } from "@/context/chatContext";
import { MessageModel } from "@chatscope/chat-ui-kit-react";

export function SQLBotMessageToMessageModel(message: SOLBotMessage): MessageModel {
    return {
        message: message.message,
        direction: message.isUser ? "outgoing" : "incoming",
    } as MessageModel;
}

export function filterUserMessages(messages: SOLBotMessage[]): SOLBotMessage[] {
    return messages.filter(message => message.isUser);
}

export function filterSystemMessages(messages: SOLBotMessage[]): SOLBotMessage[] {
    return messages.filter(message => !message.isUser);
}