"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client";

export async function GetCategories(storeId:string) {
    const store=await prismadb.store.findFirst({
        where:{
            id:storeId
        }
    })
    if(!store) return {error:"No store exists"}
    try{
        const Categories=await prismadb.category.findMany({
            where:{
                storeId:storeId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return {message:"Found",Categories};

    }catch(e){
        return {error:"Failed to get Categories"}
    }
    
}
export  async function CreateCategory(storeId:string,{name,billboardId}:{name:string,billboardId:string}):Promise<{error?:string,message?:string,Category?:Category}> {
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a Category"}
    }
    if(!name || name.trim()===""){
        return {error:"Category name is required"};
    }
    const store=await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) return {error:"No store exists"}
    // Create a Category
    try{
        const Category=await prismadb.category.create({
            data:{
                name,
                billboardId,
                storeId
            }
        })

        return {
            message:"Category created successfully",
            Category
        }

    }
    catch(error){
        return {error:"Failed to create the category"}
    }
    


    
}

export async function UpdateCategory(storeId:string,CategoryId:string,{name,billboardId}:{name:string,billboardId:string} ){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
    if(!name || name.trim()===""){
        return {error:"Category name is required"};
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
        const res=await prismadb.category.update(({
            data:{
                name,
                billboardId
            },
            where:{
                id:CategoryId,
                storeId
                
            }
        }))
        return {message:"updated successfully!" ,Category:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}

export async function DeleteCategory(CategoryId:string){
    const {userId}=await auth();
    if(!userId){
       return {error:"You must be logged in to create a store"}
    }
   
    //if(!store) return {error:"Store doesn't exits"};
    try{
        const res=await prismadb.category.delete(({
            where:{
                id:CategoryId
                
            }
        }))
        return {message:"Deleted successfully!" ,Category:res}

    }catch(e){
        return {error:"Something went wrong",errorObj:e}
    }

}