import { generateInvoicePDF } from "@/lib/generateInvoice";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }:
    {
        params: Promise<
            {
                storeId: string;
                orderId: string
            }
        >
    }) {

    const { storeId, orderId } = await params;
    const user = await auth();
    if (!user || !user.userId) {
        return NextResponse.json({ error: "You must be logged in to view an order" }, { status: 401 });
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId: user.userId
        }
    });
    if (!store) {
        return NextResponse.json({ error: "No store exists" }, { status: 404 });
    }
    const url = new URL(request.url);
    const isPreview = url.searchParams.get("preview") === "true";
    try {
        const order = await prismadb.order.findFirst({
            where: {
                id: orderId,
                storeId: storeId
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                category: true,
                                size: true,
                                color: true,

                            }
                        },

                    }
                }

            }
        });
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const pdfBuffer = await generateInvoicePDF({
            id: order.id,
            customerName: order.customerName,
            phone: order.phone,
            total: order.total,
            createdAt: order.createdAt,
            orderItems: order.orderItems.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
            })),
            storeName: store.name,
            subtotal: order.subTotal,
            tax: order.tax,
            discount: order.discount,

        })
        return new Response(
            new Uint8Array(pdfBuffer),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `${isPreview ? "inline" : "attachment"}; filename="invoice-${order.id}.pdf"`,
                }

            }
        );
    } catch (error) {
        return NextResponse.json({ error: "Failed to get order", errorObj: error }, { status: 500 });
    }




}