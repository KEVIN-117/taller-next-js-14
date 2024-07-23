'use client'
import { Button, Modal, useDisclosure } from "@nextui-org/react";
import { ModalNewProductForm } from "./ModalNewProductForm";
import {ICategory} from "@/modules/categories";

export const ModalNewProduct = ({categories}:{categories: ICategory[]}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    return (
        <>
            <Button color="primary" variant="shadow" onPress={onOpen}>Crear producto</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalNewProductForm
                    onClose={ onClose }
                    categories={ categories }
                />
            </Modal>
        </>
    );
}
