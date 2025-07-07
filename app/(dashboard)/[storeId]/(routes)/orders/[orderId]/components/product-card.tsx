"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Image from "next/image"

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

interface ProductCardProps {
    product: Product
    onAddToOrder: (product: Product) => void
}

export function ProductCard({ product, onAddToOrder }: ProductCardProps) {
    return (
        <Card className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="relative  aspect-[1.83/1] mb-3 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                        src={product.images[0] || "/placeholder.svg?height=200&width=200"}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                    />
                    {product.quantity <= 5 && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                            Low Stock
                        </Badge>
                    )}
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>

                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            {product.category}
                        </Badge>
                        {product.color && (
                            <Badge variant="outline" className="text-xs">
                                {product.color}
                            </Badge>
                        )}
                        {product.size && (
                            <Badge variant="outline" className="text-xs">
                                {product.size}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Stock: {product.quantity}</p>
                        </div>

                        <Button
                            size="sm"
                            onClick={() => onAddToOrder(product)}
                            disabled={product.quantity === 0}
                            className="shrink-0"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
