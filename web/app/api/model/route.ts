import { responseHeaderJson, responseStatusValid } from "@/lib/api/utils";

export async function GET(request: Request) {
    // Handle query
    return new Response(JSON.stringify("Hello world2!"), { ...responseHeaderJson, ...responseStatusValid });
}