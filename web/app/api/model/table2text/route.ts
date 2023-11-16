import { MODEL_API_ADDR, responseHeaderJson, responseMethodPost, responseStatusValid } from "@/lib/api/utils";

async function getModelResult(colNames: string[], rowValues: string[][]): Promise<string> {
    const addr = `${MODEL_API_ADDR}/table_to_text`;
    return await fetch(addr, {
        body: JSON.stringify({
            rows: rowValues,
        }),
        ...responseHeaderJson,
        ...responseMethodPost,
    }).then((res) => res.json());
}

interface Params {
    colNames: string[];
    rowValues: string[][]; 
}

export async function POST(request: Request) {
    const requestBody = (await request.json()) as Params;

    // Get keys from Params interface
    const paramKeys: (keyof Params)[] = ["rowValues"];
    const missingKeys = paramKeys.filter((key) => !(key in requestBody));
    if (missingKeys.length) {
        console.warn(`Invalid request body. Missing keys: ${JSON.stringify(missingKeys)}`);
        throw new Error(`Invalid request body. Missing keys: ${JSON.stringify(missingKeys)}`);
    }

    // const data = await getModelResult(requestBody.colNames, requestBody.rowValues);
    const data = JSON.stringify({"summary":"The table has been converted to text."});
    return new Response(data, { ...responseHeaderJson, ...responseStatusValid });
}