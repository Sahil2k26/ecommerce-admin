import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,
    {params}:{params:Promise<{storeId:string}>}
) {
    const {storeId}=await params
    const store=await prismadb.store.findMany({
        where:{
            id:storeId
        },
        include:{
            Billboards:true,
            Categories:true
        }
    })
    if(!store) return NextResponse.json({message:"Store doesn't exists"},{status:404});
    return NextResponse.json({message:"found",store});
    
}
export async function PATCH(req:NextRequest,{params}:{params:Promise<{storeId:string}>}) {
    const {userId}=await auth();
    if(!userId){
       return NextResponse.json({error:"You must be logged in to create a store"},{status:401});
    }
    const data=await req.json();
    if(data.name.trim()===""){
        return NextResponse.json({error:"Invalid name"},{status:400});
    }
   
    const {storeId}=await params;
    try{
        const res=await prismadb.store.update(({
            data:{
                name:data.name
            },
            where:{
                id:storeId,
                userId:userId
            }
        }))
        return NextResponse.json({message:"updated successfully!" ,store:res});

    }catch(e){
        return NextResponse.json({error:"Something went wrong",errorObj:e},{status:500});
    }
    
}

export async function DELETE(req:NextRequest,
    {params}:{params:Promise<{storeId:string}>}
) {
    const {userId}=await auth();
    
    if(!userId){
       return NextResponse.json({error:"You must be logged in to create a store"},{status:401});
    }
    const {storeId}=await params
    //if(!store) return {error:"Store doesn't exits"};
    try{
        const res=await prismadb.store.delete(({
            where:{
                id:storeId,
                userId:userId
            }
        }))
        return NextResponse.json({message:"Deleted successfully!" ,store:res});

    }catch(e){
        return NextResponse.json({error:"Something went wrong",errorObj:e},{status:500});
    }
    
}