import { PrismaClient as PC1} from '@prisma/client'
import {PrismaClient as PC2} from '@internal/prisma-second/client';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const prisma1 = new PC1()
const prisma2 = new PC2()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dbName = searchParams.get("dbName") ?? "";
    const tableName = searchParams.get("tableName") ?? "";
    
    // Check if arguments are valid
    if (dbName == "") {
        return new Response("dbName is empty")
    }
    else if(tableName == "") {
        return new Response("tableName is empty")
    }

    // route prisma to the correct database
    var prisma = null
    if(dbName == "1") {
        prisma = prisma1
    }
    else if (dbName == "2") {
        prisma = prisma2
    }
    else {
        // Raise error
        return new Response("Invalid DB name")
    }

    // Read in cars
    const getAllTableNamesQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';"
    const allTableNames = await prisma.$queryRawUnsafe(getAllTableNamesQuery) as { table_name: string }[];
    
    // Parse out table names
    const tableNames: string[] = allTableNames.map((element) => element["table_name"]);

    // Return array of error types for the model
    return new Response(JSON.stringify(tableNames));
}
