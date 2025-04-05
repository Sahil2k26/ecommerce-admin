
import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { productColumns } from "./components/columns";
import {format} from "date-fns"
import { formatter } from "@/lib/utils";

export default async function productsPage({params}:{
    params:Promise<{storeId:string}>
}){
    const {storeId} =await params;
    const products= await prismadb.product.findMany({
        where:{
            storeId:storeId
        },
        include:{
            category:true,
            size:true,
            color:true
        },
        orderBy:{
            createdAt:"desc"
        }
    }); 
    const formattedproducts:productColumns[]=products.map((b)=>(
        {
            name:b.name,
            id:b.id,
            isFeatured:b.isFeatured,
            isArchived:b.isArchived,
            price:formatter.format(b.price.toNumber()),
            category:b.category.name,
            size:b.size.name,
            color:b.color.value,
            createdAt:format(b.createdAt,"MMMM do, yyyy")
        }
    ))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedproducts}></ProductClient>
            </div>
        </div>
    )
}