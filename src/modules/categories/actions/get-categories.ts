"use server"

import { prisma } from "@/utils"
import { ICategory } from "../interfaces/category";

const ITEMS_PER_PAGE = 5;

export const getCategories = async () => {

    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            },
        });
        if( !categories ){
            return [];
        }

        return categories! as ICategory[];
    
    } catch (error) {
        console.log(error);
    }

}

export const getFilteredCategories = async (currentPage: number) => {

    try {
        const offset =  (currentPage - 1) * ITEMS_PER_PAGE;
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            },
            skip:offset,
            take:ITEMS_PER_PAGE
        });
        if( !categories ){
            return [];
        }

        return categories! as ICategory[];

    } catch (error) {
        console.log(error);
    }
}


export const totalCategories = async () => {
    try {
        const total = await prisma.category.count();
        const totalPages = Math.ceil(Number(total) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.log(error);
    }
}
