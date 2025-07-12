"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import { productColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface productClientProps {
    data: productColumns[]
}

export const ProductClient: React.FC<productClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    const n = data.length
    const available_products = data.filter((product) => (product.quantity > 0));
    const unavailable_products = data.filter((product) => (product.quantity <= 0));
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products(${n})`}
                    description="Manage products for your store"

                >
                </Heading>

                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator></Separator>

            <Tabs className="space-y-4 " defaultValue="available">
                <div className="flex items-center justify-between">
                    <TabsList >
                        <TabsTrigger value="available">In Stock</TabsTrigger>
                        <TabsTrigger value="unavailable">Out of Stock</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="available">
                    <DataTable searchKey="name" columns={columns} data={available_products} />
                </TabsContent>
                <TabsContent value="unavailable">
                    <DataTable searchKey="name" columns={columns} data={unavailable_products} />
                </TabsContent>

            </Tabs>


            <Heading
                title="API"
                description="API calls for products"
            >
            </Heading>
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
}