"use client";
import { queryResult } from "@/lib/query/type";
import React from "react";

export type queryResultContext = {
    queryResult: queryResult;
    setQueryResult: React.Dispatch<React.SetStateAction<queryResult>>;
};

const QueryResultContext = React.createContext<queryResultContext>({} as queryResultContext);

export function QueryResultContextProvider({ children }: { children: React.ReactNode }) {
    const [queryResult, setQueryResult] = React.useState<queryResult>([]);
    return (
        <QueryResultContext.Provider
            value={{
                queryResult,
                setQueryResult,
            }}
        >
            {children}
        </QueryResultContext.Provider>
    );
}

export function useQueryResultContext() {
    const context = React.useContext(QueryResultContext);
    if (context === undefined) {
        throw new Error("useQueryResultContext must be used within a QueryResultContextProvider");
    }
    return context;
}
