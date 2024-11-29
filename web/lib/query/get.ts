'use client';
import { getQueryResult } from '@/lib/api/frontend/query';
import { queryResult } from '@/lib/query/type';
import useSWR from 'swr';

export function useResultByQuery(dbName: string, query: string) {
    // Define the key for SWR based on the dbName and query.
    // If either is not present, use null to avoid fetching.
    const swrKey = dbName && query ? ['getQueryResult', dbName, query] : null;

    // Define the fetcher function directly using getQueryResult, avoiding the use of useSWRWrapper.
    const fetcher = swrKey ? () => getQueryResult(dbName, query) : null;

    // Call useSWR at the top level, passing the key and fetcher.
    const { data, error } = useSWR<queryResult>(swrKey, fetcher);

    // isLoading is not directly provided by useSWR, so it must be derived from `data` and `error`.
    const isLoading = !data && !error;

    return {
        data,
        isLoading,
        isError: !!error, // Convert error to a boolean indicating if there is an error
    };
}