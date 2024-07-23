"use server"
import {uploadImageFromBuffer} from "@/utils/uploader";
import {Iimage} from "@/modules/categories/interfaces/category";
import {prisma} from "@/utils";
import {revalidatePath} from "next/cache";


export async function createProduct(formData: FormData){
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const image = formData.get('image') as File;
    const categoryId = formData.get('categoryId') as string;

    console.log(name, price, image, categoryId)

    try {
        const buffer = Buffer.from(await image.arrayBuffer());
        const res = await uploadImageFromBuffer<Iimage>(buffer, 'products')

        const response = await prisma.product.create({
            data:{
                name,
                price: parseFloat(price),
                image: res.secure_url,
                categoryId: categoryId,
                publicId: res.public_id
            }
        })
        if (response){
            revalidatePath('/cart')
        }
    }catch (e){
        console.log(e)
    }
}
