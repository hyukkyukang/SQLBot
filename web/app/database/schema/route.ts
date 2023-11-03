import { errorTypeFilePath } from "@/app/api/analysis/utils";
import { promises as fs } from "fs";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const modelName = searchParams.get("modelName") ?? "";

    //Read the json data from file
    const fileContents = await fs.readFile(errorTypeFilePath, "utf8");
    const error_types = JSON.parse(fileContents) as Record<string, string[]>;

    //Return empty array if file is empty or model name is not present in the file
    if (Object.keys(error_types).length == 0 || !Object.keys(error_types).includes(modelName)) {
        return new Response(JSON.stringify([]));
    }

    // Return array of error types for the model
    return new Response(JSON.stringify(error_types[modelName]));
}
