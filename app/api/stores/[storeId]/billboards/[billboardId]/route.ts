import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, billboardId: string }> }
) {
    const { storeId, billboardId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const billboard = await prismadb.billboard.findFirst({
            where: {
                storeId: storeId,
                id: billboardId
            },
            include: {
                images: true
            }
        })
        return NextResponse.json({ message: "Found", billboard });

    } catch (e: unknown) {
        return NextResponse.json({ error: "Failed to get billboard", errorObj: e }, { status: 500 });
    }

}


export async function PATCH(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, billboardId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to update a billboard" }, { status: 401 });
    }
    const { storeId, billboardId } = await params;
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
        await prismadb.billboard.update(({
            data: {
                label,
                toShowLabel,
                images: {
                    deleteMany: {}
                }

            },
            where: {
                id: billboardId,
                storeId

            }
        }))
        const res = await prismadb.billboard.update({
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: unknown) => image)]
                    }
                }
            },
            where: {
                id: billboardId
            }
        })

        return NextResponse.json({ message: "updated successfully!", billboard: res })

    } catch (e: unknown) {
        return NextResponse.json({ error: "Failed to update billboard", errorObj: e }, { status: 500 });
    }

}

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, billboardId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to delete a billboard" }, { status: 401 });
    }
    const { storeId, billboardId } = await params;

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    // Create a billboard
    try {
        const res = await prismadb.billboard.delete(({

            where: {
                id: billboardId,
                storeId

            }
        }))
        return NextResponse.json({ message: "Deleted successfully!", billboard: res });



    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to delete billboard", errorObj: e }, { status: 500 });
    }

}