"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";

export async function Getsizes(storeId: string) {
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return { error: "No store exists" }
    try {
        const sizes = await prismadb.size.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return { message: "Found", sizes };

    } catch (e: unknown) {
        return { error: "Failed to get sizes", errorObj: e }
    }

}
export async function CreateSize(storeId: string, { name, value }: { name: string, value: string }) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to create a size" }
    }
    if (!name || name.trim() === "") {
        return { error: "Size name is required" };
    }
    if (!value || value.trim() == "") {
        return { error: "Size value is required" };
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return { error: "No store exists" }
    // Create a Size
    try {
        const Size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId
            }
        })

        return {
            message: "Size created successfully",
            Size
        }

    }
    catch (e: unknown) {
        return { error: "Failed to create the size", errorObj: e }
    }




}

export async function UpdateSize(storeId: string, SizeId: string, { name, value }: { name: string, value: string }) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to update a Size" }
    }
    if (!name || name.trim() === "") {
        return { error: "Size name is required" };
    }
    if (!value || value.trim() == "") {
        return { error: "Size value is required" };
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return { error: "No store exists" }

    //if(!store) return {error:"Store doesn't exits"};
    try {
        const res = await prismadb.size.update(({
            data: {
                name,
                value
            },
            where: {
                id: SizeId,
                storeId

            }
        }))
        return { message: "updated successfully!", Size: res }

    } catch (e: unknown) {
        return { error: "Something went wrong", errorObj: e }
    }

}

export async function DeleteSize(SizeId: string) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to delete a size" }
    }

    //if(!store) return {error:"Store doesn't exits"};
    try {
        const res = await prismadb.size.delete(({
            where: {
                id: SizeId

            }
        }))
        return { message: "Deleted successfully!", Size: res }

    } catch (e: unknown) {
        return { error: "Something went wrong", errorObj: e }
    }

}