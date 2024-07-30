"use client"
import { useRef } from 'react'
import { motion, useCycle } from "framer-motion";
import {useDimensions} from "@/modules/cart/hooks/useDimensions";
import {Navigation} from "@/modules/cart/components/Navigation";
import {MenuToggle} from "@/modules/cart/components/MenuToggle";
import styles from "../styles/cart.module.css";
import {IProduct} from "@/modules/products/interfaces/product";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export const SideMenuCart = ({products}:{products: IProduct[]}) => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    return (
        <div className={"relative"}>
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
                className={styles.card_nav}
            >
                <Navigation products={products} isOpen={isOpen} toggle={toggleOpen}/>
                <div className={""}>
                    <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()}/>
                </div>
            </motion.nav>
        </div>
    )
}
