'use client';
import { getQueryResult } from '@/lib/api/frontend/query';
import { queryResult } from '@/lib/query/queryResult';
import { useSWRWrapper } from '@/lib/swr/caller';
import { useMemo } from 'react';
import useSWR from 'swr';

export function getResultByQuery(dbName: string, query: string) {
    const fetcher: any = useMemo(() => dbName && query ? useSWRWrapper<[string, string, string], Promise<queryResult>>(getQueryResult): null, [dbName, query]);
    const { data, error, isLoading } = useSWR(
        ['getQueryResult', dbName, query],
        fetcher,
    );

    return {
        data: data,
        isLoading:isLoading,
        isError: error,
    };
}