import prismadb from "@/lib/prismadb";
import ColorForm from "./components/color-form";

export default async function colorPage({
    params
}: { params: Promise<{ storeId: string, colorId: string }> }) {
    const { colorId, storeId } = await params;
    const color = await prismadb.color.findFirst({
        where: {
            id: colorId
        }
    })
    return <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ColorForm storeId={storeId} initialData={color}></ColorForm>

        </div>

    </div>


}