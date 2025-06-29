"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";

export async function Getcolors(storeId: string) {
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return { error: "No store exists" }
    try {
        const colors = await prismadb.color.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return { message: "Found", colors };

    } catch (e: unknown) {
        return { error: "Failed to get colors", errorObj: e }
    }

}
export async function Createcolor(storeId: string, { name, value }: { name: string, value: string }) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to create a color" }
    }
    if (!name || name.trim() === "") {
        return { error: "color name is required" };
    }
    if (!value || value.trim() == "") {
        return { error: "color value is required" };
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return { error: "No store exists" }
    // Create a color
    try {
        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId
            }
        })

        return {
            message: "Color created successfully",
            color
        }

    }
    catch (error: unknown) {
        return { error: "Failed to create the color", errorObj: error }
    }




}

export async function Updatecolor(storeId: string, colorId: string, { name, value }: { name: string, value: string }) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to update a color" }
    }
    if (!name || name.trim() === "") {
        return { error: "color name is required" };
    }
    if (!value || value.trim() == "") {
        return { error: "color value is required" };
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
        const res = await prismadb.color.update(({
            data: {
                name,
                value
            },
            where: {
                id: colorId,
                storeId

            }
        }))
        return { message: "updated successfully!", color: res }

    } catch (e: unknown) {
        return { error: "Something went wrong", errorObj: e }
    }

}

export async function Deletecolor(colorId: string) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to delete a color" }
    }

    //if(!store) return {error:"Store doesn't exits"};
    try {
        const res = await prismadb.color.delete(({
            where: {
                id: colorId

            }
        }))
        return { message: "Deleted successfully!", color: res }

    } catch (e: unknown) {
        return { error: "Something went wrong", errorObj: e }
    }

}