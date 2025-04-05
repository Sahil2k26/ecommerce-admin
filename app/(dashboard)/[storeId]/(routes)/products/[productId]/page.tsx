import prismadb from "@/lib/prismadb";
import ProductForm from "./components/product-form"

export default async function productPage({
    params
}: { params: Promise<{ storeId: string, productId: string }> }) {
    const { productId, storeId } = await params;
    const product = await prismadb.product.findFirst({
        where: {
            id: productId
        },
        include :{
            images:true,
        }
    })
    const categories = await prismadb.category.findMany({
        where: {
            storeId: storeId
        }
    })
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: storeId
        }
    })
    const colors = await prismadb.color.findMany({  
        where: {
            storeId: storeId
        }
    })
    const formattedProduct=product? {
        ...product,
        price:product.price.toNumber(),

    }:null
        
    
    return <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductForm storeId={storeId} initialData={formattedProduct} categories={categories} colors={colors} sizes={sizes}></ProductForm>

        </div>

    </div>


}