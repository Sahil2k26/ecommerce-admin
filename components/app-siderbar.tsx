// "use client"
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     useSidebar,
//   } from "@/components/ui/sidebar"
// import { useParams, usePathname, useRouter } from "next/navigation"
// import { Button } from "./ui/button";
// import Link from "next/link";

//   export function AppSidebar() {
//     const pathname=usePathname()
//     const params=useParams();
//     const router=useRouter();
//     const {toggleSidebar}=useSidebar();
//     const routes=[
//       {
//           href:`/${params.storeId}`,
//           label:"Dashboard",
//           active:pathname===`/${params.storeId}`,

//       },
//       {
//           href:`/${params.storeId}/billboards`,
//           label:"Billboards",
//           active:pathname===`/${params.storeId}/billboards`
//       },
//       {
//           href:`/${params.storeId}/categories`,
//           label:"Categories",
//           active:pathname===`/${params.storeId}/categories`
//       },
//       {
//           href:`/${params.storeId}/sizes`,
//           label:"Sizes",
//           active:pathname===`/${params.storeId}/sizes`
//       },
//       {
//           href:`/${params.storeId}/colors`,
//           label:"Colors",
//           active:pathname===`/${params.storeId}/colors`
//       },
//       {
//           href:`/${params.storeId}/products`,
//           label:"Products",
//           active:pathname===`/${params.storeId}/products`
//       },
//       {
//           href:`/${params.storeId}/orders`,
//           label:"Orders",
//           active:pathname===`/${params.storeId}/orders`
//       },
//       {
//           href:`/${params.storeId}/settings`,
//           label:"Settings",
//           active:pathname===`/${params.storeId}/settings`
//       },

//   ]
//     return (
//       <Sidebar>
//         <SidebarContent>
//           <SidebarGroup />
//             <SidebarGroupLabel>Application</SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu className="px-2 py-4">
//               {routes.map((route,i)=>(
//                 <SidebarMenuItem key={i}>
//                   <SidebarMenuButton  asChild isActive={route.active} className='p-4 font-semibold py-5 text-base hover:bg-primary/10' >
//                     {/* <Button  
//                       variant={"outline"}
//                       onClick={()=>{
//                         router.push(route.href)
//                         toggleSidebar()
//                       }}
//                       className="flex justify-start bg-transparent border-none rounded-lg"
//                     >
//                     {/* <div className='h-6 w-6'> <item.icon   /></div>

//                       <span>{route.label}</span>
//                     </Button> */}

//                     <Link href={route.href}
//                       className="flex justify-center px-4 py-4 text-base  text-primary text-pretty hover:text-lg hover:font-bold hover:animate-out bg-gradient-to-r bg-accent  "
//                       onClick={()=>{
//                         toggleSidebar()
//                       }}
//                     >
//                         {route.label}
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           <SidebarGroup />
//         </SidebarContent>

//       </Sidebar>
//     )
//   }

"use client"
import React from "react"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { Store, ImageIcon, Grid3X3, Palette, Ruler, ShoppingCart, Package, Settings, ChevronRight, BrainCircuit } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@clerk/nextjs"

// Navigation items for the store management
const navigationItems = [
  {
    title: "Demand Forecast",
    url: "demand_forecast",
    icon: BrainCircuit,
    description: "Demand Forecast",
  },
  {
    title: "Billboards",
    url: "billboards",
    icon: ImageIcon,
    description: "Manage store banners and promotional content",
  },
  {
    title: "Categories",
    url: "categories",
    icon: Grid3X3,
    description: "Organize products into categories",
  },
  {
    title: "Colors",
    url: "colors",
    icon: Palette,
    description: "Define available product colors",
  },
  {
    title: "Sizes",
    url: "sizes",
    icon: Ruler,
    description: "Set up product size options",
  },
  {
    title: "Products",
    url: "products",
    icon: Package,
    description: "Manage your product inventory",
  },
  {
    title: "Orders",
    url: "orders",
    icon: ShoppingCart,
    description: "View and manage customer orders",
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
    description: "Configure store settings",
  },
  
]


export function AppSidebar() {
  const params = useParams()
  const pathname = usePathname()
  const { userId } = useAuth();
  if (!userId) {
    return <></>
  }

  const storeId = params?.storeId as string

  // Function to check if a navigation item is active
  const isActive = (url: string) => {
    if (!storeId) return false
    return pathname === `/${storeId}/${url}` || pathname.startsWith(`/${storeId}/${url}/`)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/${storeId}`} className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Store className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Storix</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Store Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems
                .filter((item) => item !== undefined)
                .map((item) => {
                  const href = storeId ? `/${storeId}/${item!.url}` : "#"
                  const active = isActive(item!.url)

                  return (
                    <SidebarMenuItem key={item!.title}>
                      <SidebarMenuButton asChild isActive={active} className={`${active ? "border-l-2 border-primary rounded-md " : ""}`} tooltip={item!.description}>
                        <Link
                          href={href}
                          className="flex items-center"
                          aria-label={`Navigate to ${item!.title} - ${item!.description}`}
                        >

                          {React.createElement(item!.icon, { className: "size-4" })}


                          <span>{item!.title}</span>
                          {active && <ChevronRight className="ml-auto size-4 opacity-50" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Store Info Section */}
        {/* {storeId && (
          <SidebarGroup>
            <SidebarGroupLabel>Current Store</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                <div className="font-medium text-foreground truncate" title={storeName}>
                  {storeName}
                </div>
                <div className="text-xs opacity-70">ID: {storeId}</div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )} */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
