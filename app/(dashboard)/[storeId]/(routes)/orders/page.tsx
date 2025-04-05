
import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { OrderColumns } from "./components/columns";
import {format} from "date-fns"
import { formatter } from "@/lib/utils";

export default async function OrdersPage({params}:{
    params:Promise<{storeId:string}>
}){
    const {storeId} =await params;
    const Orders= await prismadb.order.findMany({
        where:{
            storeId:storeId
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            },
    
        },
        orderBy:{
            createdAt:"desc"
        }
    }); 
    const formattedOrders:OrderColumns[]=Orders.map((b)=>(
        {
            
            id:b.id,
            phone:b.phone,
            isPaid:b.isPaid,
            address:b.address,
            products:b.orderItems.map((orderItem)=>(orderItem.product.name)).join(", "),
            totalPrice:formatter.format(b.orderItems.reduce((total,orderItem)=>{
                return total+Number(orderItem.product.price)
            },0)),
            createdAt:format(b.createdAt,"MMMM do, yyyy")
        }
    ))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders}></OrderClient>
            </div>
        </div>
    )
}