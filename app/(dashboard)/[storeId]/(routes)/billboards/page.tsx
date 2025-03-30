
import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumns } from "./components/columns";
import {format} from "date-fns"

export default async function BillboardsPage({params}:{
    params:Promise<{storeId:string}>
}){
    const {storeId} =await params;
    const billboards= await prismadb.billboard.findMany({
        where:{
            storeId:storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    }); 
    const formattedBillboards:BillboardColumns[]=billboards.map((b)=>(
        {
            label:b.label,
            id:b.id,
            createdAt:format(b.createdAt,"MMMM do, yyyy")
        }
    ))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards}></BillboardClient>
            </div>
        </div>
    )
}