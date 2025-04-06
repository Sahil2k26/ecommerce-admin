"use client"

import { Button } from "@/components/ui/button"
import { colorColumns } from "./columns"
import {  DropdownMenu,DropdownMenuTrigger,DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel  } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/modals/alert-modal"
import { useState } from "react"
import { Deletecolor } from "@/app/actions/color"


interface CellActionProps {
    data:colorColumns
}

export const CellAction:React.FC<CellActionProps> = ({data})=>{
    const [open,setopen]=useState(false);
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const params=useParams();
    const onCopy=(id:string)=>{
        navigator.clipboard.writeText(id);

        toast.success("Color ID Copied Successfully");
    }
    const onDelete= async ()=>{
            try{
                setLoading(true);
                const res=await Deletecolor(data.id) 
                setopen(false)
                if(res.error){
                    throw new Error(res.error)
                }
                router.refresh();
                toast.success(res.message || "Deleted successfully")
    
            }catch(e:any){
                toast.error( e.message=="Something went wrong"?"Make sure you have removed all the products using this color":e.message);
                //toast.error( e.message || "something went wrong");
            }finally{
                setLoading(false)
                
            }
        }
    return(
        <>
        <AlertModal 
            isOpen={open}
            loading={loading}
            onClose={()=>setopen(false)}
            onConfirm={onDelete}
        ></AlertModal>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-7 w-7 p-7">
                    <span className="sr-only">Open Menu</span> 
                    <MoreHorizontal  className="h-4 w-4" />
                    {/* sr-only   for screen-readers*/}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{router.push(`/${params.storeId}/colors/${data.id}`)}}>
                    <Edit className=" mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setopen(true)}>
                    <Trash className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}