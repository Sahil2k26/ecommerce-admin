"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import { CategoriesColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
    data:CategoriesColumns[]
}

export const CategoryClient:React.FC<CategoryClientProps> = ({data})=>{
    const router=useRouter();
    const params=useParams();
    const n=data.length
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Categories(${n})`}
                description="Manage Categories for your store"

            >
            </Heading>
            
            <Button onClick={()=>router.push(`/${params.storeId}/categories/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator></Separator>
        <DataTable searchKey="name" columns={columns}  data={data}/>
        <Heading 
            title="API"
            description="API calls for Categories"
        >
        </Heading>
        <Separator/>
        <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
    )
}