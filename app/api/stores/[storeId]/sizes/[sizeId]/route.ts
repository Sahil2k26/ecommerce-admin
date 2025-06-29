import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, sizeId: string }> }
) {
    const { storeId, sizeId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const size = await prismadb.size.findFirst({
            where: {
                storeId: storeId,
                id: sizeId
            }
        })
        return NextResponse.json({ message: "Found", size });

    } catch (e: unknown) {
        return NextResponse.json({ error: "Failed to get size", errorObj: e }, { status: 500 });
    }

}


export async function PATCH(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, sizeId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to update a size" }, { status: 401 });
    }
    const { storeId, sizeId } = await params;
    const { name, value } = await req.json();
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "size name is required" }, { status: 400 });
    }
    if (!value || value.trim() === "") {
        return NextResponse.json({ error: "size value is required" }, { status: 400 });
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
        const res = await prismadb.size.update(({
            data: {
                name,
                value

            },
            where: {
                id: sizeId,
                storeId

            }
        }))
        return NextResponse.json({ message: "updated successfully!", size: res });



    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to update size", errorObj: e }, { status: 500 });
    }

}

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, sizeId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to delete the size" }, { status: 401 });
    }
    const { storeId, sizeId } = await params;

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    // Create a billboard
    try {
        const res = await prismadb.size.delete(({

            where: {
                id: sizeId,
                storeId

            }
        }))
        return NextResponse.json({ message: "Deleted successfully!", size: res });



    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to delete size", errorObj: e }, { status: 500 });
    }

}