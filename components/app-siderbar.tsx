"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@/components/ui/sidebar"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button";
import Link from "next/link";
  
  export function AppSidebar() {
    const pathname=usePathname()
    const params=useParams();
    const router=useRouter();
    const {toggleSidebar}=useSidebar();
    const routes=[
      {
          href:`/${params.storeId}`,
          label:"Dashboard",
          active:pathname===`/${params.storeId}`,
        
      },
      {
          href:`/${params.storeId}/billboards`,
          label:"Billboards",
          active:pathname===`/${params.storeId}/billboards`
      },
      {
          href:`/${params.storeId}/categories`,
          label:"Categories",
          active:pathname===`/${params.storeId}/categories`
      },
      {
          href:`/${params.storeId}/sizes`,
          label:"Sizes",
          active:pathname===`/${params.storeId}/sizes`
      },
      {
          href:`/${params.storeId}/colors`,
          label:"Colors",
          active:pathname===`/${params.storeId}/colors`
      },
      {
          href:`/${params.storeId}/products`,
          label:"Products",
          active:pathname===`/${params.storeId}/products`
      },
      {
          href:`/${params.storeId}/orders`,
          label:"Orders",
          active:pathname===`/${params.storeId}/orders`
      },
      {
          href:`/${params.storeId}/settings`,
          label:"Settings",
          active:pathname===`/${params.storeId}/settings`
      },
      
  ]
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup />
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2 py-4">
              {routes.map((route,i)=>(
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton  asChild isActive={route.active} className='p-4 font-semibold py-5 text-base hover:bg-primary/10' >
                    {/* <Button  
                      variant={"outline"}
                      onClick={()=>{
                        router.push(route.href)
                        toggleSidebar()
                      }}
                      className="flex justify-start bg-transparent border-none rounded-lg"
                    >
                    {/* <div className='h-6 w-6'> <item.icon   /></div>
                     
                      <span>{route.label}</span>
                    </Button> */}

                    <Link href={route.href}
                      className="flex justify-center px-4 py-4 text-base  text-primary text-pretty hover:text-lg hover:font-bold hover:animate-out bg-gradient-to-r bg-accent  "
                      onClick={()=>{
                        toggleSidebar()
                      }}
                    >
                        {route.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>

      </Sidebar>
    )
  }
  