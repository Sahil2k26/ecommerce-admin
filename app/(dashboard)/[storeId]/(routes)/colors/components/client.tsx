"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import { colorColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface colorClientProps {
    data:colorColumns[]
}

export const ColorClient:React.FC<colorClientProps> = ({data})=>{
    const router=useRouter();
    const params=useParams();
    const n=data.length
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Colors(${n})`}
                description="Manage colors for your store"

            >
            </Heading>
            
            <Button onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator></Separator>
        <DataTable searchKey="name" columns={columns}  data={data}/>
        <Heading 
            title="API"
            description="API calls for colors"
        >
        </Heading>
        <Separator/>
        <ApiList entityName="colors" entityIdName="colorId"/>
        </>
    )
}