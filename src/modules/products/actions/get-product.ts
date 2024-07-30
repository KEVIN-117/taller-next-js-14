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



export async function getProductByFilter(filter: any){
    try {
        const products = await prisma.product.findMany(filter);
        if (!products){
            return [] as IProduct[]
        }
        return products as IProduct[]
    }catch (e){
        console.log(e)
    }
}

export async function getProductByPriceBetween(min: number, max: number){
    try {
        const products = await prisma.product.findMany({
            where: {
                price:{
                    gte: min,
                    lte: max
                }
            }
        })
    }catch (e){
        console.log(e)
    }
}


export async function getMaxMinPrice(){
    try {
        const products = await prisma.product.findMany();
        console.log(products)
        const maxPrice = await prisma.product.findFirst({
            select: {
                price: true
            },
            orderBy: {
                price: 'desc'
            }
        });
        const minPrice = await prisma.product.findFirst({
            select: {
                price: true
            },
            orderBy: {
                price: 'asc'
            }
        });
        console.log(maxPrice?.price, minPrice?.price)

        return {
            max: maxPrice?.price,
            min: minPrice?.price
        }
    }catch (e){
        console.log(e)
    }
}
