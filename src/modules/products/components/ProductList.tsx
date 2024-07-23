import React from 'react'
import { ProductCard } from './ProductCard'
import { ModalNewProduct } from '..'
import {getCategories, ICategory} from "@/modules/categories";
import {getProducts} from "@/modules/products/actions/get-product";
import {IProduct} from "@/modules/products/interfaces/product";

export const ProductList = async () => {
    const categories = await getCategories() as ICategory[];
    const products = await getProducts() as IProduct[]
    return (
        <section>
            <div className="container">
                <div className='flex items-center justify-between mb-6'>
                    <h2>Lista de <span className='font-light'>Productos</span></h2>
                    <ModalNewProduct categories={categories}/>
                </div>
                {
                    products && products.length > 0? (
                        <ul className='product__list py-10'>
                            {
                                products.map(product => (
                                    <li key={product.id}>
                                        <ProductCard product={product}/>
                                    </li>
                                ))
                            }
                        </ul>
                    ): (
                        <h2 className={"text-sky-600 text-center font-bold"}>No hay productos registrados</h2>
                    )
                }
            </div>
        </section>
    )
}
