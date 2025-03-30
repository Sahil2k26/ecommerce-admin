"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import { BillboardColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface BillboardClientProps {
    data:BillboardColumns[]
}

export const BillboardClient:React.FC<BillboardClientProps> = ({data})=>{
    const router=useRouter();
    const params=useParams();
    const n=data.length
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Billboards(${n})`}
                description="Manage billboards for your store"

            >
            </Heading>
            
            <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator></Separator>
        <DataTable searchKey="label" columns={columns}  data={data}/>
        </>
    )
}