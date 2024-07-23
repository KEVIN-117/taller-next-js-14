"use server"

import { prisma } from "@/utils"
import { revalidatePath } from "next/cache";

import { uploadImageFromBuffer } from "@/utils/uploader";
import {Iimage} from "@/modules/categories/interfaces/category";


export const createCategory = async ( formData: FormData ) => {

    const name = formData.get('name') as string;
    const image = formData.get('image') as File;

    try {
        const buffer = Buffer.from(await image.arrayBuffer());
        const res = await uploadImageFromBuffer<Iimage>(buffer, 'categories')
        const response = await prisma.category.create({
            data: {
                name,
                image: res.secure_url,
                publicId: res.public_id
            }
        });

        revalidatePath('/cart')

    } catch (error) {
        console.log(error);

    }
}


