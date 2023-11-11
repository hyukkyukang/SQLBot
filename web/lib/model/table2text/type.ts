// Key as the column name and value as the cell value
export type rowItem = {
    [key: string]: string | number;
}

export type summarizationInput = {
    rows: rowItem[];
}

export type summarizationResult = {
    summary: string;
}
