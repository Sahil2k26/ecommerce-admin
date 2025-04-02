import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string ,categoryId:string}> }
) {
    const { storeId ,categoryId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const category = await prismadb.category.findFirst({
            where: {
                storeId: storeId,
                id:categoryId
            }
        })
        return NextResponse.json({ message: "Found", category });

    } catch (e) {
        return NextResponse.json({ error: "Failed to get category" }, { status: 500 });
    }

}


export async function PATCH(req:NextRequest,
    {params}:{params:Promise<{storeId:string,categoryId:string}>}
) {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a billboard" },{status:401});
    }
    const {storeId,categoryId}=await params;
    const {name,billboardId}=await req.json();
    if (!name || name.trim() === "") {
        return NextResponse.json({ error: "Category name is required" },{status:400});
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
        const res=await prismadb.category.update(({
            data:{
                name,
                billboardId
                
            },
            where:{
                id:categoryId,
                storeId
                
            }
        }))
        return NextResponse.json({message:"updated successfully!" ,category:res});

        

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to update category" },{status:500});
    }
    
}

export async function DELTE(req:NextRequest,
    {params}:{params:Promise<{storeId:string,categoryId:string}>}
) {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a billboard" },{status:401});
    }
    const {storeId,categoryId}=await params;

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return  NextResponse.json({ error: "No store exists" },{status:404});
    // Create a billboard
    try {
        const res=await prismadb.category.delete(({
        
            where:{
                id:categoryId,
                storeId
                
            }
        }))
        return NextResponse.json({message:"Deleted successfully!" ,category:res});

        

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to delete category" },{status:500});
    }
    
}