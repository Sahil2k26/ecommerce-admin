"use client"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "./ui/sidebar"

export function MobileSideBar() {
    const { toggleSidebar } = useSidebar()
    return (
        <>
            <Button
                variant={"outline"}
                size={"icon"}
                className="flex justify-center items-center rounded-lg border-0 "
                onClick={toggleSidebar}
            >
                <Menu className="h-6 w-6" />
            </Button>
        </>
    )
} 