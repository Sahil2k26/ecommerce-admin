import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

export default async function CategoryPage({
    params
}: { params: Promise<{ storeId: string, categoryId: string }> }) {
    const { categoryId, storeId } = await params;
    const category = await prismadb.category.findFirst({
        where: {
            id: categoryId
        }
    })
    const billboards= await prismadb.billboard.findMany({
        where:{
            storeId
        }
    }) 
    return <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryForm storeId={storeId} billboards={billboards} initialData={category}></CategoryForm>

        </div>

    </div>


}