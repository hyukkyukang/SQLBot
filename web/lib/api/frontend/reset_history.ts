import { API_ADDR, fetchWithTimeout } from '@/lib/api/utils';
import { translationResult } from '@/lib/model/text2sql/type';

export async function getTranslationResult(): Promise<translationResult> {
    const addr = "/api/model/text2sql/reset";
    return fetchWithTimeout(addr).then(res => res.json());
}

