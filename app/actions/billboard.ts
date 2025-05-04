"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";
import { Billboard } from "@prisma/client";
import { log } from "console";

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
            include:{
                images:true
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
export  async function CreateBillboard(storeId:string,{label,images,toShowLabel}:{label:string,images:{url:string}[],toShowLabel:boolean}):Promise<{error?:string,message?:string,billboard?:Billboard}> {
    console.log(label,images,storeId);
    
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a billboard"}
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
                toShowLabel,
                storeId,
                images:{
                    createMany:{
                        data:[...images.map((image)=>image)]
                    }
                }

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

export async function UpdateBillboard(storeId:string,billboardId:string,{label,images,toShowLabel}:{label:string,images:{url:string}[],toShowLabel:boolean} ){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to update the billboard"}
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
        await prismadb.billboard.update(({
            data:{
                label,
                toShowLabel,
                images:{
                    deleteMany:{}
                }

            },
            where:{
                id:billboardId,
                storeId
                
            }
        }))
        const res=await prismadb.billboard.update({
            data:{
                images:{
                    createMany:{
                        data:[...images.map((image)=>image)]
                    }
                }
            },
            where:{
                id:billboardId
            }
        })

        return {message:"updated successfully!" ,billboard:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}

export async function DeleteBillboard(billboardId:string){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to delete the billboard"}
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