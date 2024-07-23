"use client"
import { useRef } from 'react'
import { Button } from '@nextui-org/button'
import { motion, useCycle } from "framer-motion";
import {useDimensions} from "@/modules/cart/hooks/useDimensions";
import {Navigation} from "@/modules/cart/components/Navigation";
import {MenuToggle} from "@/modules/cart/components/MenuToggle";
import styles from "../styles/cart.module.css";

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

export const SideMenuCart = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const products = [
        {
            id: 1,
            name: "Producto 1",
            price: 10.00
        },
        {
            id: 2,
            name: "Producto 2",
            price: 20.00
        }
    ]
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
                <div className={"mt-2 ml-2"}>
                    <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()}/>
                </div>
            </motion.nav>
        </div>
    )
}
