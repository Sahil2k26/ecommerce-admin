
import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { OrderColumns } from "./components/columns";
import { format } from "date-fns"

export default async function OrdersPage({ params }: {
    params: Promise<{ storeId: string }>
}) {
    const { storeId } = await params;
    const Orders = await prismadb.order.findMany({
        where: {
            storeId: storeId
        },
        include: {
            orderItems: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const formattedOrders: OrderColumns[] = Orders.map((b) => (
        {

            id: b.id,
            customerName: b.customerName,
            isPaid: b.isPaid,
            status: b.orderStatus,
            orderType: b.orderType,
            total: b.total,
            items: b.orderItems.reduce((total, item) => {
                return total + item.quantity;
            }, 0),
            createdAt: format(b.createdAt, "MMMM do, yyyy")
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