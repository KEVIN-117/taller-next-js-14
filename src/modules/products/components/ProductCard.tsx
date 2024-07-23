import React from 'react'
import {IProduct} from "@/modules/products/interfaces/product";

export const ProductCard = ({product}:{product: IProduct}) => {
    return (
        <div className='product__card'>
            {/* <div className='mb-4 rounded-xl overflow-hidden'> */}
                <img 
                    className='product__card--image'
                src={product.image} alt="Producto" />
            {/* </div> */}

            <div className={"py-5 px-3"}>
                <div className="flex justify-between text-base font-medium">
                    <h3 className="text-sky-500 dark:text-sky-400 uppercase">
                        {product.name}
                    </h3>
                    <p className="ml-4 text-slate-700 dark:text-slate-500">${product.price}</p>
                </div>
            </div>
        </div>
    )
}
