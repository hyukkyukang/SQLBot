import { queryResult } from "@/lib/query/type";


export function validateSameNumCols(queryResult: queryResult): boolean {
    if (queryResult && queryResult.length === 0) {
        return true;
    }
    const numCols = Object.keys(queryResult[0]).length;
    for (const row of queryResult) {
        if (Object.keys(row).length !== numCols) {
            return false;
        }
    }
    return true;
}

export function queryResultToColNames(queryResult: queryResult): string[] {
    if (queryResult && queryResult.length === 0) {
        return [];
    }
    return Object.keys(queryResult[0]);
}

export function queryResultToRows(queryResult: queryResult): (string | number)[][] {
    return queryResult.map(row => Object.values(row));
}