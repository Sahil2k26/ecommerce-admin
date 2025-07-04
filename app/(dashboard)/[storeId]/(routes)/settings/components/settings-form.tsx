"use client"

import { DeleteStore, UpdateStore } from "@/app/actions/store"
import AlertModal from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/Heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/use-origin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})
export type SettingsFormValues = z.infer<typeof formSchema>;
export default function SettingsForm({ initialData }: SettingsFormProps) {

    const [open, setopen] = useState(false);
    const [loading, setLoading] = useState(false);


    const origin = useOrigin();
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });
    const router = useRouter();


    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
        try {
            setLoading(true)

            const res = await UpdateStore(initialData.id, data)
            //const res=await axios.patch(`/api/stores/${initialData.id}`,data);
            // if(res.data.error){
            //     throw new Error(res.data.error);
            // }
            // router.refresh();
            // toast.success(res.data.message || "Done Successfully");


            if (res.error) {
                throw new Error(res.error);
            }
            router.refresh();
            toast.success(res.message || "Done Successfully!");



        } catch (e: unknown) {
            const message = e instanceof Error
                ? e.message
                : "Something went wrong.";
            toast.error(message);

            // if (e instanceof AxiosError) {
            //     toast.error(e.response?.data.error || e.message);
            // }
            // else toast.error(e.message || "Something went wrong,")
        }
        finally {
            setLoading(false)
        }



    }
    const onDelete = async () => {
        try {
            setLoading(true);
            const res = await DeleteStore(initialData.id);
            if (res.error) {
                throw new Error(res.error);
            }
            router.refresh();
            router.push("/home") // to validate if there are other store and what store to show
            toast.success(res.message || "Done successfully");
            router.refresh();


        } catch (e: unknown) {
            const message = e instanceof Error
                ? e.message
                : "Something went wrong.";
            toast.error(message);

            // toast.error(e.message || "Make sure you have removed all the products and categories first");
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <AlertModal isOpen={open} loading={loading} onClose={() => setopen(false)} onConfirm={onDelete} />
            <div className=" flex items-center justify-between">
                <Heading title="Settings" description="Manage your store settings"></Heading>
                <Button variant="destructive"
                    disabled={loading}
                    size="icon"
                    onClick={() => setopen(true)}
                >
                    <Trash className="h-4 w-4"></Trash>

                </Button>

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
                                            placeholder="Store name"
                                            {...field}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/stores/${initialData.id}`}
                variant="public" />


        </>
    )
}