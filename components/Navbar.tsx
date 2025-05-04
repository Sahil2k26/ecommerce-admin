import { UserButton, useUser } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { MobileSideBar } from "./mobile-sidebar";

export async function NavBar(){
    const {userId}= await auth();
    if(!userId){
        redirect("/signin");
    }
    const stores= await prismadb.store.findMany({
        where:{
            userId
        }
    });
    return (
        <div className=" border-b ">
            <div className="flex h-16 items-center px-4">
                <MobileSideBar />
                <StoreSwitcher items={stores}/>
                <MainNav className="mx-6"></MainNav>
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle/>
                    <UserButton afterSwitchSessionUrl="/"/>

                </div>

            </div>

        </div>
    )
}