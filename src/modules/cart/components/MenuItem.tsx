import * as React from "react";
import { motion } from "framer-motion";
import styles from "../styles/cart.module.css";
import {IProduct} from "@/modules/products/interfaces/product";
const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, product }:{i:number, product: IProduct}) => {
    const style = { border: `2px solid ${colors[i]}` };
    return (
        <motion.li
            className={`${styles.card_li} text-center text-white font-bold`}
            variants={variants}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
        >

            <img className={styles.icon_placeholder} style={style} src={product.image} alt={product.name}/>
            <section className={`${styles.text_placeholder} py-3 px-3`} style={style}>
                <h2>
                    {product.name}
                </h2>
                <p>
                    {product.price}
                </p>
            </section>
        </motion.li>
    );
};
