"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";
import { Billboard } from "@prisma/client";

export async function GetBillboards(storeId:string) {
    const store=await prismadb.store.findFirst({
        where:{
            id:storeId
        }
    })
    if(!store) return {error:"No store exists"}
    try{
        const billboards=await prismadb.billboard.findMany({
            where:{
                storeId:storeId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return {message:"Found",billboards};

    }catch(e){
        return {error:"Failed to get billboards"}
    }
    
}
export  async function CreateBillboard(storeId:string,{label,imageUrl}:{label:string,imageUrl:string}):Promise<{error?:string,message?:string,billboard?:Billboard}> {
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
    if(!label || label.trim()===""){
        return {error:"Billboard name is required"};
    }
    const store=await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) return {error:"No store exists"}
    // Create a billboard
    try{
        const billboard=await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId
            }
        })

        return {
            message:"Billboard created successfully",
            billboard
        }

    }
    catch(error){
        return {error:"Failed to create billboard"}
    }
    


    
}

export async function UpdateBillboard(storeId:string,billboardId:string,{label,imageUrl}:{label:string,imageUrl:string} ){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
    if(!label || label.trim()===""){
        return {error:"Billboard name is required"};
    }
    const store=await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) return {error:"No store exists"}
   
    //if(!store) return {error:"Store doesn't exits"};
    try{
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
        return {message:"updated successfully!" ,billboard:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}

export async function DeleteBillboard(billboardId:string){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
   
    //if(!store) return {error:"Store doesn't exits"};
    try{
        const res=await prismadb.billboard.delete(({
            where:{
                id:billboardId
                
            }
        }))
        return {message:"Deleted successfully!" ,billboard:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}