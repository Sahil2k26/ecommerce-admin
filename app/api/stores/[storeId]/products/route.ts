import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const { storeId } = await params
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return NextResponse.json({ error: "No store exists" }, { status: 404 });
    try {
        const Products = await prismadb.product.findMany({
            where: {
                storeId: storeId,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ message: "Found", Products });

    } catch (e) {
        return NextResponse.json({ error: "Failed to get Products" }, { status: 500 });
    }

}

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const {userId}=await auth();
    if(!userId){
       return NextResponse.json({error:"You must be logged in to create a Product"},{status:401})
    }
    const {price,name,categoryId,sizeId,colorId,isFeatured,isArchived,images}=await req.json();
    if(!name || name.trim()===""){
        return NextResponse.json({error:"Product name is required"},{status:400});
    }
    if(!images || images.length===0){
        return NextResponse.json({error:"Product image is required"},{status:400});
    }
    const {storeId}=await params;
    const store=await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) return NextResponse.json({error:"No store exists"},{status:404})
    const category=await prismadb.category.findFirst({
        where:{
            id:categoryId,
            storeId
        }
    })
    if(!category) return NextResponse.json({error:"No category exists"},{status:404})
    const size=await prismadb.size.findFirst({
        where:{
            id:sizeId,
            storeId
        }
    })
    if(!size) return NextResponse.json({error:"No size exists"},{status:404})
    const color=await prismadb.color.findFirst({
        where:{
            id:colorId,
            storeId
        }
    })
if(!color) return NextResponse.json({error:"No color exists"},{status:404})
    
    
    // Create a Product
    try{
        const Product=await prismadb.product.create({
            data:{
                name,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                storeId,
                price,
                images:{
                    createMany:{
                        data:[...images.map((image:{url:string})=>image)]
                    }
                }
            }
            
        })

    

        return NextResponse.json({
            message:"Product created successfully",
            Product
        })

    }
    catch(error){
        return NextResponse.json({error:"Failed to create Product"},{status:500})
    }


}