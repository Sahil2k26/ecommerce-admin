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
        const categories = await prismadb.category.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ message: "Found", categories });

    } catch (e) {
        return NextResponse.json({ error: "Failed to get categories" }, { status: 500 });
    }

}

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a category" },{status:401});
    }
    const {storeId}=await params;
    const {billboardId,name}=await req.json();
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "category name is required" },{status:400});
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })

    const billboard= await prismadb.billboard.findFirst({
        where: {
            id:billboardId,
            storeId
        }
    })
    if (!store || !billboard) return  NextResponse.json({ error: "No store exists " },{status:404});
    // Create a category
    try {
        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId
            }
        })

        return NextResponse.json({
            message: "category created successfully",
            category
        })

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to create category" },{status:500});
    }


}