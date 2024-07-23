"use client";
import { CategoryCard, ICategory } from '..'
import { ModalNewCategory } from './modal-new-category/ModalNewCategory'
import { usePathname, useSearchParams } from 'next/navigation';
import Link from "next/link";

import { MoveLeft, MoveRight } from "lucide-react"

interface Props {
    categories: ICategory[],
    totalPages: number
}

export const CategoryList = ({ categories, totalPages }: Props) => {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageUrl = (pageNumber: number) =>{
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    }

    return (
        <section>
            <div className="container">
                <div className='flex items-center justify-between mb-6'>
                    <h2>Lista de <span className='font-light'>Categorias</span></h2>
                    <ModalNewCategory />
                </div>

                <div className={"flex justify-center items-center"}>
                    <div className={"md:block hidden"}>
                        <Link className={`${currentPage === 1? "hidden": ""}`} href={createPageUrl(currentPage - 1)}>
                            <MoveLeft color="#fe265c" size={64} />
                        </Link>
                    </div>
                    <ul className='category__list'>
                        {
                            categories && categories.length > 0? (
                                categories.map(category => (
                                    <li className={"w-full flex justify-center items-center"} key={category.id}>
                                        <CategoryCard
                                            category={ category }
                                        />
                                    </li>
                                ))
                            ):(
                                <h2 className={"text-sky-600 text-center font-bold"}>No hay categorias registradas</h2>
                            )
                        }
                    </ul>
                    <div className={"md:block hidden"}>
                        <Link className={`${currentPage === totalPages? "hidden": ""}`} href={createPageUrl(currentPage + 1)}>
                            <MoveRight color="#fe265c" size={64} />
                        </Link>
                    </div>
                </div>
                <div className={"md:hidden flex justify-between items-center"}>
                    <Link className={`${currentPage === 1? "hidden": ""}`} href={createPageUrl( currentPage - 1)}>
                        <MoveLeft color="#fe265c" size={64} />
                    </Link>
                    <Link className={`${currentPage === totalPages? "hidden": ""}`} href={createPageUrl(currentPage + 1)}>
                        <MoveRight color="#fe265c" size={64} />
                    </Link>
                </div>
            </div>

        </section>
    )
}
