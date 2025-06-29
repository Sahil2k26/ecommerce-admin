"use server"

import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";

interface ProductData {
    price: number,
    name: string,
    categoryId: string,
    sizeId: string,
    colorId: string,
    isFeatured: boolean,
    isArchived: boolean,
    images: { url: string }[]
}
export async function GetProducts(storeId: string) {
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })
    if (!store) return { error: "No store exists" }
    try {
        const Products = await prismadb.product.findMany({
            where: {
                storeId: storeId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return { message: "Found", Products };

    } catch (e: unknown) {
        return { error: "Failed to get Products", errorObj: e }
    }

}
export async function CreateProduct(storeId: string, data: ProductData) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to create a Product" }
    }
    const { price, name, categoryId, sizeId, colorId, isFeatured, isArchived, images } = data;
    if (!name || name.trim() === "") {
        return { error: "Product name is required" };
    }
    if (!images || images.length === 0) {
        return { error: "Product image is required" };
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return { error: "No store exists" }
    const category = await prismadb.category.findFirst({
        where: {
            id: categoryId,
            storeId
        }
    })
    if (!category) return { error: "No category exists" }
    const size = await prismadb.size.findFirst({
        where: {
            id: sizeId,
            storeId
        }
    })
    if (!size) return { error: "No size exists" }
    const color = await prismadb.color.findFirst({
        where: {
            id: colorId,
            storeId
        }
    })
    if (!color) return { error: "No color exists" }


    // Create a Product
    try {
        const Product = await prismadb.product.create({
            data: {
                name,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                storeId,
                price,
                images: {
                    createMany: {
                        data: [...images.map((image) => image)]
                    }
                }
            }

        })



        return {
            message: "Product created successfully",
            Product
        }

    }
    catch (e: unknown) {
        return { error: "Failed to create Product", errorObj: e }
    }




}

export async function UpdateProduct(storeId: string, productId: string, { price, name, categoryId, sizeId, colorId, isFeatured, isArchived, images }: ProductData) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to update the product" }
    }
    if (!name || name.trim() === "") {
        return { error: "Product name is required" };
    }
    if (!images || images.length === 0) {
        return { error: "Product image is required" };
    }
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) return { error: "No store exists" }
    const category = await prismadb.category.findFirst({
        where: {
            id: categoryId,
            storeId
        }
    })
    if (!category) return { error: "No category exists" }
    const size = await prismadb.size.findFirst({
        where: {
            id: sizeId,
            storeId
        }
    })
    if (!size) return { error: "No size exists" }
    const color = await prismadb.color.findFirst({
        where: {
            id: colorId,
            storeId
        }
    })
    if (!color) return { error: "No color exists" }

    //if(!store) return {error:"Store doesn't exits"};
    try {
        await prismadb.product.update(({
            data: {
                name,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                storeId,
                price,
                images: {
                    deleteMany: {}
                }

            },
            where: {
                id: productId,
                storeId

            }
        }))
        const res = await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image) => image)]
                    }
                }
            }
        })

        return { message: "updated successfully!", Product: res }

    } catch (e: unknown) {
        return { error: "Something went wrong", errorObj: e }
    }

}

export async function DeleteProduct(ProductId: string) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to delete the product" }
    }
    //if(!store) return {error:"Store doesn't exits"};
    try {
        const res = await prismadb.product.delete(({
            where: {
                id: ProductId

            }
        }))
        return { message: "Deleted successfully!", Product: res }

    } catch (e: unknown) {
        return { error: "Something went wrong", errorObj: e }
    }

}