"use client";
import React, {useState} from 'react'
import { ICategory } from '../interfaces/category'
import { Button } from "@nextui-org/button";
import {Pencil, Trash2} from "lucide-react";
import {deleteCategory} from "@/modules/categories/actions/delete-category";
import { toast } from 'sonner'

interface Props {
    category: ICategory
}


export const CategoryCard = ({ category }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await deleteCategory(category.id, category.publicId);
        if (res?.resI.result === 'ok' && res.res.name){
            toast.success('Categoria eliminada')
        }
        setIsLoading(false)
    }


    return (
        <div className='category__card shrink-0'>
            <img className='category__card--image' src={ category.image } alt="Categoria" />
            <h3 className={"text-center text-sky-600"}>{ category.name }</h3>
            <div className='flex w-full justify-evenly items-center'>
                <form onSubmit={handleDelete}>
                    <Button isLoading={isLoading} isDisabled={isLoading} type={"submit"} color="danger" variant="shadow">
                        <Trash2 />
                    </Button>
                </form>

                <Button color="success" variant="shadow">
                    <Pencil />
                </Button>
            </div>
        </div>
    )
}
