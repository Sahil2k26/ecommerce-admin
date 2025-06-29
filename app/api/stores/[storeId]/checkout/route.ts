import prismadb from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"

// TODO: ADD RAZORPAY GATEWAY
// import Razorpay from "razorpay"
// import { Orders } from "razorpay/dist/types/orders"
// const razorpay= new Razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID!,
//     key_secret:process.env.RAZORPAY_KEY_SECRET!,

// })

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}
export async function POST(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { storeId } = await params
    const { productIds } = await req.json();
    if (!productIds || productIds.length === 0) return NextResponse.json({ error: "Product ids are required" }, { status: 400 });

    // const products =await prismadb.product.findMany({
    //     where:{
    //         storeId,
    //         id:{
    //             in:productIds
    //         }
    //     },
    //     include:{
    //         size:true,
    //         images:true,
    //         category:true,


    //     }
    // })
    // const line_items:Orders.LineItems[]=[]
    // products.forEach((p)=>{
    //     line_items.push({
    //         type:p.category.name,
    //         sku:p.id,
    //         price:(p.price*100).toString(),
    //         variant_id:p.id,
    //         quantity:1,
    //         name:p.name,
    //         offer_price:(p.price*100).toString(),
    //         tax_amount:0,
    //         description:"test",
    //         dimensions:{
    //             length:"10",
    //             width:"10",
    //             height:"10"
    //         },
    //         weight:"1700",
    //         image_url:p.images[0].url,
    //         product_url:p.images[0].url
    //     })
    // })
    // const total=products.reduce((t,p)=>t+p.price*100,0)

    // const options:Orders.RazorpayOrderCreateRequestBody={
    //     amount:total,
    //     currency:"INR",
    //     receipt:"receipt#22",
    //     notes:{},
    //     line_items:line_items,
    //     line_items_total:total
    // }


    try {
        //const order=await razorpay.orders.create(options)

        const o = await prismadb.order.create({
            data: {
                storeId,
                isPaid: false,
                orderItems: {
                    create: productIds.map((pid: string) => ({
                        product: {
                            connect: {
                                id: pid
                            }
                        },
                        quantity: 1
                    }))

                }
            }
        })
        return NextResponse.json({ order: o.id }, { status: 200 });
    }
    catch (e) {
        console.error("Error creating order", e)
        return NextResponse.json(
            { error: "Error creating order" },
            { status: 500 }
        )
    }

}