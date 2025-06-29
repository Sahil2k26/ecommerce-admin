"use client"

import { CreateSize, DeleteSize, UpdateSize } from "@/app/actions/size"
import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/Heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface SizesFormProps {
    storeId: string
    initialData: Size | null
}
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})
export type SizesFormValues = z.infer<typeof formSchema>;


export default function SizeForm({ storeId, initialData }: SizesFormProps) {

    const [open, setopen] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    //const params=useParams();


    const title = initialData ? "Edit Size" : "Create Size";
    const description = initialData ? "Manage your product sizes" : "Add a product new size";
    const action = initialData ? "Save changes" : "Create";


    const form = useForm<SizesFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    });



    const onSubmit = async (data: SizesFormValues) => {
        console.log(data);
        try {
            setLoading(true)
            const res = initialData ? await UpdateSize(initialData.storeId, initialData.id, data) :
                await CreateSize(storeId, data);
            if (res.error) {
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Done Successfully!");
            console.log(res);
            router.push(`/${storeId}/sizes`)





        } catch (e: unknown) {
            const message = e instanceof Error
                ? e.message
                : "Something went wrong.";
            toast.error(message);

            // toast.error(e.message || "Something went wrong,")
        }
        finally {
            setLoading(false)
        }



    }
    const onDelete = async () => {
        try {
            if (!initialData) return;
            setLoading(true);
            const res = await DeleteSize(initialData.id)
            if (res.error) {
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Deleted successfully")
            router.push(`/${storeId}/sizes`)// to validate if there are other store and what store to show
            //toast.success(res.message ||"Done successfully");
            router.refresh();




        } catch (e: unknown) {
            console.log(e);
            const message = e instanceof Error
                ? e.message
                : "Something went wrong.";
            toast.error(message);

            // toast.error(e.message == "Something went wrong" ? "Make sure you have removed all the products using this size" : e.message);
            //toast.error( e.message || "Something went wrong")
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
                                            placeholder="Size name"
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Size value"
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