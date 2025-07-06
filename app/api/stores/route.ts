import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
    req: NextRequest
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a store" }, { status: 401 })
    }
    const body = await req.json()
    const { name } = body;
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "Store name is required" }, { status: 400 });
    }
    // Create a store

    try {
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json({
            message: "Store created successfully",
            store
        })

    }
    catch (error: unknown) {
        return NextResponse.json({ error: "Failed to create store", errorObj: error }, { status: 500 })
    }

}