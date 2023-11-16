'use client';
import { getTranslationResult } from '@/lib/api/frontend/text2sql';
import { translationResult } from '@/lib/model/text2sql/type';
import useSWR from 'swr';

export function useTranslatedSQLByQuestion(dbName: string, question: string, resetHistory: boolean) {
    // Define the key for SWR based on the dbName and query.
    // If either is not present, use null to avoid fetching.
    const swrKey = dbName && question ? ['getTranslationResult', dbName, question] : null;

    // Define the fetcher function directly using getQueryResult, avoiding the use of useSWRWrapper.
    const fetcher = swrKey ? () => getTranslationResult(dbName, question, resetHistory) : null;

    // Call useSWR at the top level, passing the key and fetcher.
    const { data, error } = useSWR<translationResult>(swrKey, fetcher);

    // isLoading is not directly provided by useSWR, so it must be derived from `data` and `error`.
    const isLoading = !data && !error;

    return {
        data,
        isLoading,
        isError: !!error, // Convert error to a boolean indicating if there is an error
    };
}