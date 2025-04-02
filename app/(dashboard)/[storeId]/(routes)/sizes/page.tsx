
import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizeColumns } from "./components/columns";
import {format} from "date-fns"

export default async function SizesPage({params}:{
    params:Promise<{storeId:string}>
}){
    const {storeId} =await params;
    const sizes= await prismadb.size.findMany({
        where:{
            storeId:storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    }); 
    const formattedSizes:SizeColumns[]=sizes.map((b)=>(
        {
            name:b.name,
            id:b.id,
            value:b.value,
            createdAt:format(b.createdAt,"MMMM do, yyyy")
        }
    ))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes}></SizeClient>
            </div>
        </div>
    )
}