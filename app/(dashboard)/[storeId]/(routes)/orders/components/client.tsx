"use client"

import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { OrderColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"


interface OrderClientProps {
    data:OrderColumns[]
}

export const OrderClient:React.FC<OrderClientProps> = ({data})=>{
    
    const n=data.length
    return (
        <>

        <Heading 
            title={`Orders(${n})`}
            description="Manage Orders for your store"

        >
        </Heading>
        <Separator></Separator>
        <DataTable searchKey="phone" columns={columns}  data={data}/>

        </>
    )
}