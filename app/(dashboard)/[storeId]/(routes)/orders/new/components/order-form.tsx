"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProductCard } from "./product-card"
import { OrderSummary } from "./order-summary"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Product {
    id: string
    title: string
    price: number
    quantity: number
    color: string
    size: string
    images: string[]
    category: string
    createdAt: string
}

interface OrderItem {
    productId: string
    product: Product
    quantity: number
}

interface OrderFormProps {
    storeId: string
    products: Product[]

}

export function OrderForm({ storeId, products }: OrderFormProps) {
    const [customerName, setCustomerName] = useState("")
    const [phone, setPhone] = useState("")
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    // Calculate totals
    const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const discount = subtotal * 0.1 // 10% discount
    const taxes = (subtotal - discount) * 0.08 // 8% tax
    const total = subtotal - discount + taxes

    const addToOrder = (product: Product) => {
        setOrderItems((prev) => {
            const existingItem = prev.find((item) => item.productId === product.id)
            if (existingItem) {
                return prev.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...prev, { productId: product.id, product, quantity: 1 }]
        })
    }

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromOrder(productId)
            return
        }
        setOrderItems((prev) =>
            prev.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item)),
        )
    }

    const removeFromOrder = (productId: string) => {
        setOrderItems((prev) => prev.filter((item) => item.productId !== productId))
    }

    const handleSubmit = async () => {
        if (!customerName || !phone || orderItems.length === 0) {
            alert("Please fill in all required fields and add at least one product")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`/api/stores/${storeId}/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderType: "IN_STORE",
                    customerName,
                    phone,
                    lineItems: orderItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                }),
            })

            if (response.ok) {
                toast.success("Order created successfully!")

            } else {
                toast.error("Failed to create order")
                //alert("Failed to create order")
            }


        } catch (error) {
            console.error("Error creating order:", error)
            toast.error("An error occurred while creating the order")
            //alert("An error occurred while creating the order")
        } finally {

            setIsLoading(false)
            router.push(`/${storeId}/orders`)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Selection */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Select Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} onAddToOrder={addToOrder} />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Order Details */}
            <div className="space-y-6">
                {/* Customer Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="customerName">Customer Name *</Label>
                            <Input
                                id="customerName"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter customer name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Items ({orderItems.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {orderItems.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No items added yet</p>
                        ) : (
                            <ScrollArea className="h-[300px]">
                                <div className="space-y-3">
                                    {orderItems.map((item) => (
                                        <div key={item.productId} className="flex items-center gap-3 p-3 border rounded-lg">
                                            <div className="relative w-12 h-12 rounded-md overflow-hidden">
                                                <Image
                                                    src={item.product.images[0] || "/placeholder.svg?height=48&width=48"}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{item.product.title}</p>
                                                <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {item.product.color && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.product.color}
                                                        </Badge>
                                                    )}
                                                    {item.product.size && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.product.size}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => removeFromOrder(item.productId)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <OrderSummary
                    subtotal={subtotal}
                    discount={discount}
                    taxes={taxes}
                    total={total}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    disabled={!customerName || !phone || orderItems.length === 0}

                />
            </div>
        </div>
    )
}
