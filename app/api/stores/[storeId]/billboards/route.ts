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
            include: {
                images: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ message: "Found", billboards });

    } catch (e: unknown) {
        return NextResponse.json({ error: "Failed to get billboards", errorObj: e }, { status: 500 });
    }

}

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a billboard" }, { status: 401 });
    }
    const { storeId } = await params;
    const { label, images, toShowLabel } = await req.json();
    if (!label || label.trim() === "") {
        return NextResponse.json({ error: "Billboard name is required" }, { status: 400 });
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
        const billboard = await prismadb.billboard.create({
            data: {
                label,
                toShowLabel,
                storeId,
                images: {
                    createMany: {
                        data: [...images || [].map((image) => image)]
                    }
                }
            }
        })

        return NextResponse.json({
            message: "Billboard created successfully",
            billboard
        })

    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to create billboard", errorObj: e }, { status: 500 });
    }


}