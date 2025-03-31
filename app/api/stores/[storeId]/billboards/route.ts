import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { storeId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ message: "Found", billboards });

    } catch (e) {
        return NextResponse.json({ error: "Failed to get billboards" }, { status: 500 });
    }

}

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a billboard" },{status:401});
    }
    const {storeId}=await params;
    const {label,imageUrl}=await req.json();
    if (!label || label.trim() === "") {
        return NextResponse.json({ error: "Billboard name is required" },{status:400});
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return  NextResponse.json({ error: "No store exists" },{status:404});
    // Create a billboard
    try {
        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId
            }
        })

        return NextResponse.json({
            message: "Billboard created successfully",
            billboard
        })

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to create billboard" },{status:500});
    }


}