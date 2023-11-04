import { API_ADDR, fetchWithTimeout } from '@/lib/api/utils';
import { modelResult } from '@/lib/model/type';

export async function getModelResult(dbName: string, question: string): Promise<modelResult> {
    const addr = `${API_ADDR}/model/?dbName=${dbName}&question=${question}`;
    return fetchWithTimeout(addr).then(res => res.json());
}

