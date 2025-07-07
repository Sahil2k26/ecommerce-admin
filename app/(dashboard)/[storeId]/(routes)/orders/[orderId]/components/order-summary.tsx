"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, ShoppingCart } from "lucide-react"

interface OrderSummaryProps {
    subtotal: number
    discount: number
    taxes: number
    total: number
    onSubmit: () => void
    isLoading: boolean
    disabled: boolean
    isNewOrder: boolean
}

export function OrderSummary({
    subtotal,
    discount,
    taxes,
    total,
    onSubmit,
    isLoading,
    disabled,
    isNewOrder,
}: OrderSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Taxes (8%)</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <Button onClick={onSubmit} disabled={disabled || isLoading} className="w-full" size="lg">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {isNewOrder ? "Create Order" : "Update Order"}
                        </>
                    )}
                </Button>

                {disabled && !isLoading && (
                    <p className="text-xs text-muted-foreground text-center">
                        Please add customer information and at least one product
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
