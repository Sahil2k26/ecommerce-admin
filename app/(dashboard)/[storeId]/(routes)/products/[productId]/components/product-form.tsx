"use client"

import { CreateProduct, DeleteProduct, UpdateProduct } from "@/app/actions/product"
import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/Heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Color, Image, Product, Size} from "@prisma/client"
import { Circle, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {z} from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface productsFormProps {
    storeId:string
    initialData: {
        id:string
        name:string
        isFeatured:boolean
        isArchived:boolean
        createdAt:Date
        updatedAt:Date
        categoryId:string
        colorId:string
        sizeId:string
        storeId:string
        images:Image[]
        price:number
    } & {
        images:Image[]
        
    } | null
    categories: Category[]
    colors: Color[]
    sizes: Size[]
}
const formSchema=z.object({
    name:z.string().min(1,"Product name is required"),
    images:z.object({url:z.string()}).array(),
    price:z.coerce.number().min(1,"Price is required"),
    categoryId:z.string().min(1,"Category is required"),
    colorId:z.string().min(1,"Color is required"),
    sizeId:z.string().min(1,"Size is required"),
    isFeatured:z.boolean().default(false),
    isArchived:z.boolean().default(false),


})
export type productsFormValues=z.infer<typeof formSchema>;


export default function ProductForm({storeId,initialData,categories,colors,sizes}: productsFormProps) {
    
    const [open,setopen]=useState(false);
    const [loading,setLoading]=useState(false);

    const router=useRouter();
    //const params=useParams();
    

    const title=initialData?"Edit product":"Create product";
    const description=initialData?"Manage your store product":"Add a new product";
    const action=initialData?"Save changes":"Create";


    const form=useForm<productsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData ? {
            ...initialData,
            price:parseFloat(String(initialData?.price)),
            // in sql it is decimal but in js it is float
        }
        : {
            name:"",
            images:[],
            price:0,
            categoryId:"",
            colorId:"",
            sizeId:"",
            isArchived:false,
            isFeatured:false,
        }
    });

    const handleImageChange = (newUrl: string) => {
        const currentImages = form.getValues("images");
        form.setValue("images", [...currentImages, { url: newUrl }], {
          shouldValidate: true,
        });
      };
    
      const handleImageRemove = (urlToRemove: string) => {
        const currentImages = form.getValues("images");
        form.setValue(
          "images",
          currentImages.filter((img) => img.url !== urlToRemove),
          { shouldValidate: true }
        );
      };
    
    


    const onSubmit=async (data:productsFormValues)=>{
        console.log(data);
        try{
            setLoading(true)
            const res= initialData? await UpdateProduct(initialData.storeId,initialData.id,data):
                        await CreateProduct(storeId,data);
            if(res.error){
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Done Successfully!");
            console.log(res.Product);
            router.push(`/${storeId}/products`)
            

            
            

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
            const res=await DeleteProduct(initialData.id) 
            router.refresh();
            toast.success(res.message || "Deleted successfully")
            router.push(`/${storeId}/products`)// to validate if there are other store and what store to show
            toast.success(res.message ||"Done successfully");




        }catch(e:any){
            
            toast.error( e.message || "Internal server error");
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
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value.map((image)=>image.url)} // Map to URLs
                                    disabled={loading}
                                    onChange={handleImageChange}
                                    onRemove={handleImageRemove}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-8 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="Product name"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input 
                                    
                                        disabled={loading}
                                        placeholder="9.99"
                                        type="number"
                                        {...field}
                                    ></Input>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a category"
                                            >

                                            </SelectValue>

                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((c)=>(
                                            <SelectItem 
                                                value={c.id}
                                                key={c.id}
                                            >{c.name}</SelectItem>))}
                                    </SelectContent>
                                </Select>
                                
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="colorId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select its color"
                                            >

                                            </SelectValue>

                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {colors.map((c)=>(
                                            <SelectItem 
                                                value={c.id}
                                                key={c.id}
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <Circle className="h-5 w-5" fill={c.value}></Circle>
                                                    {c.name}
                                                </div>
                                            </SelectItem>))}
                                    </SelectContent>
                                </Select>
                                
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sizeId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select its size"
                                            >

                                            </SelectValue>

                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sizes.map((c)=>(
                                            <SelectItem 
                                                value={c.id}
                                                key={c.id}
                                            >{c.name}</SelectItem>))}
                                    </SelectContent>
                                </Select>
                                
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({field})=>(
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 flex-wrap">
                                
                                <FormControl>
                                    <Checkbox 
                                        checked={field.value}
                                        onCheckedChange={field.onChange}

                                    />
                                </FormControl>
                                <FormLabel>Featured</FormLabel>
                                <FormDescription>
                                    This product will be featured on the home page.
                                </FormDescription>

                                <FormMessage></FormMessage>
                            </FormItem>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="isArchived"
                        render={({field})=>(
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 flex-wrap">
                                
                                <FormControl>
                                    <Checkbox 
                                        checked={field.value}
                                        onCheckedChange={field.onChange}

                                    />
                                </FormControl>
                                <FormLabel>Archived</FormLabel>
                                <FormDescription>
                                    This product will not appear in the
                                </FormDescription>

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