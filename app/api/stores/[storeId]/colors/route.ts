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
        const colors = await prismadb.color.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ message: "Found", colors });

    } catch (e) {
        return NextResponse.json({ error: "Failed to get colors" }, { status: 500 });
    }

}

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a color" },{status:401});
    }
    const {storeId}=await params;
    const {value,name}=await req.json();
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "color name is required" },{status:400});
    }
    if (!value || value.trim() === "") {
        return NextResponse.json({ error: "color value is required" },{status:400});
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })

    if (!store ) return  NextResponse.json({ error: "No store exists " },{status:404});
    // Create a color
    try {
        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId
            }
        })

        return NextResponse.json({
            message: "color created successfully",
            color
        })

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to create color" },{status:500});
    }


}