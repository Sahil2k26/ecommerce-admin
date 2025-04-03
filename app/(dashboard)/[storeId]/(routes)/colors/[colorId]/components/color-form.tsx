"use client"

import { Createcolor, Deletecolor, Updatecolor } from "@/app/actions/color"
import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/Heading"
import {ColorPicker} from "react-pick-color"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color} from "@prisma/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {z} from "zod"

interface colorsFormProps {
    storeId:string
    initialData: Color | null
}
const formSchema=z.object({
    name:z.string().min(1),
    value:z.string().min(4).regex(/^#/,{
        message:"String must be a valid hex code" ,
    })
})
export type colorsFormValues=z.infer<typeof formSchema>;


export default function ColorForm({storeId,initialData}: colorsFormProps) {
    
    const [open,setopen]=useState(false);
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    //const params=useParams();
    

    const title=initialData?"Edit color":"Create color";
    const description=initialData?"Manage your product colors":"Add a product new color";
    const action=initialData?"Save changes":"Create";


    const form=useForm<colorsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            name:"Red",
            value:"#121212"
        }
    });
    


    const onSubmit=async (data:colorsFormValues)=>{
        console.log(data);
        try{
            setLoading(true)
            const res= initialData? await Updatecolor(initialData.storeId,initialData.id,data):
                        await Createcolor(storeId,data);
            if(res.error){
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Done Successfully!");
            console.log(res);
            router.push(`/${storeId}/colors`)
            

            
            

        }catch(e:any){
            toast.error(e.message  || "Something went wrong," )
        }
        finally{
            setLoading(false)
        }

        
        
    }
    const onDelete= async ()=>{
        try{
            if(!initialData) return;
            setLoading(true);
            const res=await Deletecolor(initialData.id) 
            router.refresh();
            toast.success(res.message || "Deleted successfully")
            router.push(`/${storeId}/colors`)// to validate if there are other store and what store to show
            //toast.success(res.message ||"Done successfully");




        }catch(e:any){
            console.log(e);
            
            toast.error( e.message || "Something went wrong")
        }finally{
            setLoading(false)
        }
    }


    return (
        <>
        <AlertModal 
            isOpen={open}
            loading={loading} 
            onClose={()=>setopen(false)} 
            onConfirm={onDelete} 
        />
        <div className=" flex items-center justify-between">
            <Heading 
                title={title} 
                description={description}
            ></Heading>
            {initialData && <Button 
                variant="destructive"
                disabled={loading}
                color="icon"
                onClick={() =>setopen(true)}
                >   
                <Trash className="h-4 w-4"></Trash>
            </Button>}
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="color name"
                                        {...field}
                                    ></Input>
                                    
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    {/* <Input 
                                        disabled={loading}
                                        placeholder="color value"
                                        {...field}
                                    ></Input> */}
                                    <ColorPicker color={field.value} onChange={color => field.onChange(color.hex)} />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    {action}
                </Button>
            </form>
        </Form>


        </>
    )
}