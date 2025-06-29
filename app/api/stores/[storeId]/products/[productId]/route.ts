import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, productId: string }> }
) {
    const { storeId, productId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const product = await prismadb.product.findFirst({
            where: {
                storeId: storeId,
                id: productId
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            }
        })
        return NextResponse.json({ message: "Found", product });

    } catch (e: unknown) {
        return NextResponse.json({ error: "Failed to get Product", errorObj: e }, { status: 500 });
    }

}


export async function PATCH(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, productId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to update a Product" }, { status: 401 });
    }
    const { storeId, productId } = await params;
    const { name, price, categoryId, sizeId, colorId, isFeatured, isArchived, images } = await req.json();
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }
    if (!images || images.length === 0) {
        return NextResponse.json({ error: "Product image is required" }, { status: 400 });
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    const category = await prismadb.category.findFirst({
        where: {
            id: categoryId,
            storeId
        }
    })
    if (!category) return NextResponse.json({ error: "No category exists" }, { status: 404 });
    const size = await prismadb.size.findFirst({
        where: {
            id: sizeId,
            storeId
        }
    })
    if (!size) return NextResponse.json({ error: "No size exists" }, { status: 404 });
    const color = await prismadb.color.findFirst({
        where: {
            id: colorId,
            storeId
        }
    })
    if (!color) return NextResponse.json({ error: "No color exists" }, { status: 404 });

    //if(!store) return {error:"Store doesn't exits"};
    try {
        await prismadb.product.update(({
            data: {
                name,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                storeId,
                price,
                images: {
                    deleteMany: {}
                }

            },
            where: {
                id: productId,
                storeId

            }
        }))
        const res = await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                }
            }
        })

        return NextResponse.json({ message: "updated successfully!", product: res })

    } catch (e: unknown) {
        return NextResponse.json({ error: "Something went wrong", errorObj: e }, { status: 500 })
    }

}

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ storeId: string, productId: string }> }
) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to delete a Product" }, { status: 401 });
    }
    const { storeId, productId } = await params;

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    // Create a Product
    try {
        const res = await prismadb.product.delete(({

            where: {
                id: productId,
                storeId

            }
        }))
        return NextResponse.json({ message: "Deleted successfully!", product: res });



    }
    catch (e: unknown) {
        return NextResponse.json({ error: "Failed to delete Product", errorObj: e }, { status: 500 });
    }

}