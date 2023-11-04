import { API_ADDR, fetchWithTimeout } from '@/lib/api/utils';
import { queryResult } from '@/lib/query/type';

export async function getQueryResult(dbName: string, query: string): Promise<queryResult> {
    const addr = `${API_ADDR}/database/query/?dbName=${dbName}&query=${query}`;
    return fetchWithTimeout(addr).then(res => res.json());
}