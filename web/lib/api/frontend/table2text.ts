import { API_ADDR, fetchWithTimeout, responseHeaderJson, responseMethodPost } from '@/lib/api/utils';
import { summarizationInput, summarizationResult } from '@/lib/model/table2text/type';

export async function getSummarizationResult(rowValues: summarizationInput): Promise<summarizationResult> {
    const addr = `${API_ADDR}/model/table2text`;
    console.log(`addr: ${addr}`);
    return fetchWithTimeout(addr, {
        body: JSON.stringify({
            rowValues: rowValues,
        }),
        ...responseHeaderJson, ...responseMethodPost 
        }).then(res => res.json());
}

