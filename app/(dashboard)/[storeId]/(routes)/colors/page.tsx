
import prismadb from "@/lib/prismadb";
import { ColorClient } from "./components/client";
import { colorColumns } from "./components/columns";
import {format} from "date-fns"

export default async function colorsPage({params}:{
    params:Promise<{storeId:string}>
}){
    const {storeId} =await params;
    const colors= await prismadb.color.findMany({
        where:{
            storeId:storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    }); 
    const formattedcolors:colorColumns[]=colors.map((b)=>(
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
                <ColorClient data={formattedcolors}></ColorClient>
            </div>
        </div>
    )
}