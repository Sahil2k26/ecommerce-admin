"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";

export  async function CreateStore(name:string):Promise<{error?:string,message?:string,store?:any}> {
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
    if(!name || name.trim()===""){
        return {error:"Store name is required"};
    }
    // Create a store
    try{
        const store=await prismadb.store.create({
            data:{
                name,
                userId
            }
        })

        return {
            message:"Store created successfully",
            store
        }

    }
    catch(error){
        return {error:"Failed to create store"}
    }
    


    
}

export async function UpdateStore(storeId:string,data:{name:string} ){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
    if(data.name.trim()===""){
        return {error:"Invalid name"};
    }
   
    //if(!store) return {error:"Store doesn't exits"};
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
        return {message:"updated successfully!" ,store:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}

export async function DeleteStore(storeId:string){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
   
    //if(!store) return {error:"Store doesn't exits"};
    try{
        const res=await prismadb.store.delete(({
            where:{
                id:storeId,
                userId:userId
            }
        }))
        return {message:"Deleted successfully!" ,store:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}