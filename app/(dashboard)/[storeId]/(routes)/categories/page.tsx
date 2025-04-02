
import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoriesColumns } from "./components/columns";
import {format} from "date-fns"

export default async function CategoriesPage({params}:{
    params:Promise<{storeId:string}>
}){
    const {storeId} =await params;
    const categories= await prismadb.category.findMany({
        where:{
            storeId:storeId
        },
        select:{
            id:true,
            name:true,
            storeId:true,
            billboardId:true,
            createdAt:true,
            updatedAt:true,
            Billboard:true
        },
        orderBy:{
            createdAt:"desc"
        }
    }); 
    const formattedCategories:CategoriesColumns[]=categories.map((b)=>(
        {
            name:b.name,
            id:b.id,
            billboardLabel:b.Billboard.label,
            createdAt:format(b.createdAt,"MMMM do, yyyy")
        }
    ))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}></CategoryClient>
            </div>
        </div>
    )
}