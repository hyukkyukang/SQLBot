
export enum MessageType {
    isUser = "isUser",
    isSQL = "isSQL",
    isResultSummary = "isResultSummary",
    isAnalysis = "isAnalysis",
}

export type SOLBotMessage = {
    message: string;
    confidence: number;
    intent: string | null;
    type: MessageType
};
