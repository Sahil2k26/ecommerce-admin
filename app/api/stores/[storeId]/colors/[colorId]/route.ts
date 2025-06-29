import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, colorId: string }> }
) {
    const { storeId, colorId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const color = await prismadb.color.findFirst({
            where: {
                storeId: storeId,
                id: colorId
            }
        })
        return NextResponse.json({ message: "Found", color });

    } catch (e: unknown) {
        return NextResponse.json({ error: "Failed to get color", errorObj: e }, { status: 500 });
    }

}


export async function PATCH(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, colorId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to update a color" }, { status: 401 });
    }
    const { storeId, colorId } = await params;
    const { name, value } = await req.json();
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "color name is required" }, { status: 400 });
    }
    if (!value || value.trim() === "") {
        return NextResponse.json({ error: "color value is required" }, { status: 400 });
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    // Create a billboard
    try {
        const res = await prismadb.color.update(({
            data: {
                name,
                value

            },
            where: {
                id: colorId,
                storeId

            }
        }))
        return NextResponse.json({ message: "updated successfully!", color: res });



    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to update color", errorObj: e }, { status: 500 });
    }

}

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, colorId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to delete the color" }, { status: 401 });
    }
    const { storeId, colorId } = await params;

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    // Create a billboard
    try {
        const res = await prismadb.color.delete(({

            where: {
                id: colorId,
                storeId

            }
        }))
        return NextResponse.json({ message: "Deleted successfully!", color: res });



    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to delete color", errorObj: e }, { status: 500 });
    }

}