import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

export default async function BillboardPage({
    params
}: { params: Promise<{ storeId: string, billboardId: string }> }) {
    const { billboardId, storeId } = await params;
    const billboard = await prismadb.billboard.findFirst({
        where: {
            id: billboardId
        },
        include:{
            images:true
        }
    })
    return <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardForm storeId={storeId} initialData={billboard}></BillboardForm>

        </div>

    </div>


}