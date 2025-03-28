import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";
import { NavBar } from "@/components/Navbar";

export default async function DashboardLayout({ children,params }:{
    children: React.ReactNode,
    params:Promise<{storeId:string}>
}) {
    const {userId}=await auth();
    if(!userId){
        redirect('/signin');
    }
    const {storeId}=await params;
    try{
        const store=await prismadb.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        })
        if(!store) redirect("/");
    }catch(e){
        redirect("/")
    }
    

    return (
        <>
        <NavBar></NavBar>
        {children}
        </>
            
        
    );
}