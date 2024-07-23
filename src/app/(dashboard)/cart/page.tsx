import { CategoryList, getCategories } from "@/modules/categories";
import { ProductList } from "@/modules/products";
import {getFilteredCategories, totalCategories} from "@/modules/categories/actions/get-categories";
import {Suspense} from "react";

export default async function CartPage({searchParams}: { searchParams?: { page?: string }}) {
    const currentPage = Number(searchParams?.page) || 1;
    const categories = await getFilteredCategories(currentPage);
    const totalPages = await totalCategories() as number;
    return (
        <>
            {/* LISTADO DE CATEGORIAS */}
            <Suspense fallback={<h2>Cargando...</h2>}>
                <CategoryList
                    totalPages={ totalPages }
                    categories={ categories! }
                />
            </Suspense>

            {/* MENU DE PRODUCTOS */}
            <ProductList/>

        </>
    );
}
