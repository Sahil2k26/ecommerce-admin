import prismadb from "@/lib/prismadb";
import SizeForm from "./components/Size-form";

export default async function SizePage({
    params
}: { params: Promise<{ storeId: string, sizeId: string }> }) {
    const { sizeId, storeId } = await params;
    const Size = await prismadb.size.findFirst({
        where: {
            id: sizeId
        }
    })
    return <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeForm storeId={storeId} initialData={Size}></SizeForm>

        </div>

    </div>


}