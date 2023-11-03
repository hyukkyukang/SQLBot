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
    const query = searchParams.get("query") ?? "";

    // Check if arguments are valid
    if (dbName == "") {
        return new Response("dbName is empty")
    }
    else if(query == "") {
        return new Response("query is empty")
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
    const queryResult = await prisma.$queryRawUnsafe(query);
    
    console.log(queryResult);

    // Return array of error types for the model
    return new Response(JSON.stringify(queryResult));
}
