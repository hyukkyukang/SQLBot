export type modelResult = {
    question: string;
    db_id: string;
    sql: string;
    confidence: number;
    influence_scores: number[];
}