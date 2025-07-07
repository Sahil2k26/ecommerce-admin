import { GetProducts } from "@/app/actions/product"
import { OrderForm } from "./components/order-form"
import { format } from "date-fns"

interface OrderPageProps {
    params: Promise<{
        storeId: string
        orderId: string
    }>
}

export default async function OrderPage({ params }: OrderPageProps) {
    const { storeId, orderId } = await params
    const res = await GetProducts(storeId)
    if (res.error || res.errorObj || !res.Products) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold">Error</h1>
                <p className="text-red-500">{res.error || "Failed to load products"}</p>
            </div>
        )
    }
    const products = res.Products.map((product) => ({
        id: product.id,
        title: product.name,
        price: product.price,
        images: product.images.map((img) => img.url),
        category: product.category.name,
        quantity: product.quantity,
        color: product.color.name,
        size: product.size.name,
        createdAt: format(product.createdAt, "MMMM do, yyyy"),
    }))

    const isNewOrder = orderId === "new"

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{isNewOrder ? "Create New Order" : `Update Order #${orderId}`}</h1>
                <p className="text-muted-foreground">
                    {isNewOrder ? "Add products and customer details to create a new order" : "Modify the existing order details"}
                </p>
            </div>

            <OrderForm storeId={storeId} orderId={isNewOrder ? null : orderId} products={products} isNewOrder={isNewOrder} />
        </div>
    )
}
