"use client"

import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { OrderColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useRouter } from "next/navigation"


interface OrderClientProps {
    data: OrderColumns[]
}


export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {

    const n = data.length
    const router = useRouter();
    const params = useParams();
    const stats = {
        total: n,
        paid: data.filter((item) => item.isPaid).length,
        unpaid: data.filter((item) => !item.isPaid).length,
        pending: data.filter((item) => item.status === "PENDING").length,
        completed: data.filter((item) => item.status === "COMPLETED").length,
        cancelled: data.filter((item) => item.status === "CANCELLED").length,
        revenue: data.reduce((t, item) => item.isPaid ? t + parseFloat(item.total) : t, 0),
    }
    return (
        <div className="space-y-6 ">
            <div className="flex items-center justify-between">
                <Heading title={`Orders (${n})`} description="Manage your orders" />
                <Button className="flex items-center justify-center text-md font-semibold  gap-x-2"
                    onClick={() => router.push(`/${params.storeId}/orders/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create
                </Button>
            </div>
            <Separator></Separator>
            <div className="grid gap-4 md:grid-cols-5 sm:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">${stats.revenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">{stats.paid} payments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>


                </div>



                <TabsContent value="all">
                    <DataTable searchKey="customerName" columns={columns} data={data} />
                </TabsContent>
                <TabsContent value="pending">
                    <DataTable searchKey="customerName" columns={columns} data={data.filter((item) => item.status == "PENDING")} />
                </TabsContent>
                <TabsContent value="unpaid">
                    <DataTable searchKey="customerName" columns={columns} data={data.filter((item) => !item.isPaid)} />
                </TabsContent>
                <TabsContent value="completed">
                    <DataTable searchKey="customerName" columns={columns} data={data.filter((item) => item.status == "COMPLETED")} />
                </TabsContent>


            </Tabs>


        </div>
    )
}