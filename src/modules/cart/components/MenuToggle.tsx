import * as React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import {Button} from "@nextui-org/button";
import styles from "../styles/cart.module.css";
const Path = (props:any) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

export const MenuToggle = ({ isOpen, toggle }:{isOpen: boolean,toggle:any}) => {
    return (
        <Button color={"primary"} variant={"shadow"} onClick={toggle}>
            <ShoppingCart size={20} />
        </Button>
    );
}
