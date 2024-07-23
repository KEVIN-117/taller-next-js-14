import * as React from "react";
import {motion, useCycle} from "framer-motion";
import { MenuItem } from "./MenuItem";
import styles from "../styles/cart.module.css";
import {Button} from "@nextui-org/button";
import {MenuToggle} from "@/modules/cart/components/MenuToggle";

const variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {

        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};


export const Navigation = ({isOpen,toggle, products}:{isOpen: boolean, toggle:any, products: any[]}) => {
    return (
        <motion.ul className={`${styles.card_ul} md:w-auto w-[90vw] space-y-5`}
                   variants={variants}
        >
            <MenuToggle isOpen={isOpen} toggle={() => toggle()}/>
            <div className={"flex flex-col h-[90vh] gap-5"}>
                <h2 className={"text-center text-white"}>Carrito de <span className='font-light'>Compras</span></h2>
                <div className={"rounded-xl border border-slate-900 p-4 h-full backdrop-blur-md bg-slate-900/30"}>
                    {
                        products && products.length > 0? (
                            itemIds.map(i => (
                                <MenuItem i={i} key={i}/>
                            ))
                        ) : (
                            <h2 className={"text-center text-white font-bold"}>No hay productos en el carrito</h2>
                        )
                    }
                </div>

                <Button className={"mt-auto"} color='primary' size='lg' variant='shadow'>Pagar: 0.00$</Button>
            </div>
        </motion.ul>
    );
}

const itemIds = [0, 1, 2, 3, 4];
