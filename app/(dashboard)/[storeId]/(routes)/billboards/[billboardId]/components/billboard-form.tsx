"use client"

import { CreateBillboard, DeleteBillboard, UpdateBillboard } from "@/app/actions/billboard"
import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/Heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard} from "@prisma/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {z} from "zod"

interface BillboardsFormProps {
    storeId:string
    initialData: Billboard | null
}
const formSchema=z.object({
    label:z.string().min(1),
    imageUrl:z.string().min(1)
})
export type BillboardsFormValues=z.infer<typeof formSchema>;


export default function BillboardForm({storeId,initialData}: BillboardsFormProps) {
    
    const [open,setopen]=useState(false);
    const [loading,setLoading]=useState(false);

    const router=useRouter();
    //const params=useParams();
    

    const title=initialData?"Edit billboard":"Create billboard";
    const description=initialData?"Manage your store billboard":"Add a new billboard";
    const action=initialData?"Save changes":"Create";


    const form=useForm<BillboardsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            label:"",
            imageUrl:""
        }
    });
    


    const onSubmit=async (data:BillboardsFormValues)=>{
        console.log(data);
        try{
            setLoading(true)
            const res= initialData? await UpdateBillboard(initialData.storeId,initialData.id,data):
                        await CreateBillboard(storeId,data);
            if(res.error){
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Done Successfully!");
            console.log(res.billboard);
            router.push(`/${storeId}/billboards`)
            

            
            

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
            const res=await DeleteBillboard(initialData.id) 
            if(res.error){
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Deleted successfully")
            router.push(`/${storeId}/billboards`)// to validate if there are other store and what store to show
            //toast.success(res.message ||"Done successfully");




        }catch(e:any){
            toast.error( e.message=="Something went wrong"?"Make sure you have removed all categories using this billboard":e.message);
            //toast.error( e.message || "Make sure you have removed all categories using this billboard");
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
                size="icon"
                onClick={() =>setopen(true)}
                >   
                <Trash className="h-4 w-4"></Trash>
            </Button>}
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full">
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Billboard Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value?[field.value]:[]}
                                    disabled={loading}
                                    onChange={(url)=>field.onChange(url)}
                                    onRemove={()=>field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="Billboard label"
                                        {...field}
                                    ></Input>
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