import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,
    {params}:{params:Promise<{storeId:string,billboardId:string}>}
) {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a billboard" },{status:401});
    }
    const {storeId,billboardId}=await params;
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
        const res=await prismadb.billboard.update(({
            data:{
                label,
                imageUrl
            },
            where:{
                id:billboardId,
                storeId
                
            }
        }))
        return NextResponse.json({message:"updated successfully!" ,billboard:res});

        

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to update billboard" },{status:500});
    }
    
}

export async function DELTE(req:NextRequest,
    {params}:{params:Promise<{storeId:string,billboardId:string}>}
) {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "You must be logged in to create a billboard" },{status:401});
    }
    const {storeId,billboardId}=await params;

    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return  NextResponse.json({ error: "No store exists" },{status:404});
    // Create a billboard
    try {
        const res=await prismadb.billboard.delete(({
        
            where:{
                id:billboardId,
                storeId
                
            }
        }))
        return NextResponse.json({message:"Deleted successfully!" ,billboard:res});

        

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to delete billboard" },{status:500});
    }
    
}