"use server"

import {prisma} from "@/utils";
import {IProduct} from "@/modules/products/interfaces/product";

export async function getProducts(){
    try {
        const products = await prisma.product.findMany();
        if (!products){
            return [] as IProduct[]
        }
        return products as IProduct[]
    }catch (e){
        console.log(e)
    }
}
