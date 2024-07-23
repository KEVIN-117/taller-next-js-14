"use server";
import {prisma} from "@/utils";
import {deleteImageFromCloudinary} from "@/utils/uploader";
import {revalidatePath} from "next/cache";

export async function deleteCategory(id: string, publicId: string){
    try {
        const resI = await deleteImageFromCloudinary(publicId)
        const res = await prisma.category.delete({
            where: {
                id: id
            }
        })

        revalidatePath('/cart')
        return {resI, res}

    }catch (error) {
        console.log(error)
    }
}
