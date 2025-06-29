"use client"

import { CreateCategory, DeleteCategory, UpdateCategory } from "@/app/actions/category"
import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/Heading"
import { Input } from "@/components/ui/input"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface CategoriesFormProps {
    storeId: string
    initialData: Category | null
    billboards: Billboard[]
}
const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})
export type CategoriesFormValues = z.infer<typeof formSchema>;


export default function CategoryForm({ storeId, initialData, billboards }: CategoriesFormProps) {

    const [open, setopen] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    //const params=useParams();


    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData ? "Manage your store Category" : "Add a new Category";
    const action = initialData ? "Save changes" : "Create";


    const form = useForm<CategoriesFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: ""
        }
    });



    const onSubmit = async (data: CategoriesFormValues) => {
        console.log(data);
        try {
            setLoading(true)
            const res = initialData ? await UpdateCategory(initialData.storeId, initialData.id, data) :
                await CreateCategory(storeId, data);
            if (res.error) {
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Done Successfully!");
            console.log(res.Category);
            router.push(`/${storeId}/categories`)





        } catch (e: any) {
            toast.error(e.message || "Something went wrong,")
        }
        finally {
            setLoading(false)
        }



    }
    const onDelete = async () => {
        try {
            if (!initialData) return;
            setLoading(true);
            const res = await DeleteCategory(initialData.id)
            if (res.error) {
                throw new Error(res.error)
            }
            router.refresh();
            console.log(res);
            toast.success(res.message || "Deleted successfully")
            router.push(`/${storeId}/categories`)// to validate if there are other store and what store to show
            router.refresh();


        } catch (e: any) {

            toast.error(e.message == "Something went wrong" ? "Make sure you have removed all the products using this category" : e.message);
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => setopen(false)}
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
                    onClick={() => setopen(true)}
                >
                    <Trash className="h-4 w-4"></Trash>
                </Button>}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Category Name"
                                            {...field}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
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
                                                    placeholder="Select a billboard"
                                                >

                                                </SelectValue>

                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    value={billboard.id}
                                                    key={billboard.id}
                                                >{billboard.label}</SelectItem>))}
                                        </SelectContent>
                                    </Select>

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