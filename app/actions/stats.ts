"use server"

import prismadb from "@/lib/prismadb"

interface graphData {
    name: string
    total: number
}
export async function getTotalRevenue(storeId: string) {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })
    const TotalRevenue = paidOrders.reduce((t, o) => (t + o.orderItems.reduce((total, item) => total + item.product.price, 0)), 0)
    return TotalRevenue;

}
export async function getSalesCount(storeId: string) {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true
        },

    })

    return salesCount;

}

export async function getStockCount(storeId: string) {
    const stockCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false
        },

    })
    return stockCount;

}

export async function getGraphRevenue(storeId: string) {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })
    const monthlyRevenue: { [key: number]: number } = {};
    for (const order of paidOrders) {
        const month = order.createdAt.getMonth()
        const revenue = order.orderItems.reduce((t, i) => t + i.product.price, 0)
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue
    }
    const graphData: graphData[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }
    return graphData


}