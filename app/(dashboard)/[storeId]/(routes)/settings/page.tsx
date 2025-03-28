import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface SettingsProps {
    params:Promise<{storeId:string}>
}
export default async function Settings(props:SettingsProps) {
    const {storeId} = await props.params
    const {userId}=await auth();
    if(!userId) redirect("/signin");

    const store=await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) redirect("/");


    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}></SettingsForm>
            </div>
        </div>
    )
}