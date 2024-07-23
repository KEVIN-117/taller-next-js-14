'use client'
import {ChangeEvent, FormEvent, useState} from 'react';
import { toast } from 'sonner';
import { createProduct } from "../../actions/create-product"
import { ModalContent, ModalHeader, ModalBody, Button, Select, Input, SelectItem } from '@nextui-org/react';
import {ICategory} from "@/modules/categories";

interface Props {
    onClose: () => void,
    categories: ICategory[],
}

export const ModalNewProductForm = ({ onClose, categories }: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    console.log(categories)
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files![0])
        const image = e.target.files![0]
        const preview = URL.createObjectURL(image);
        setPreviewImage(preview);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        // OBTENER LOS DATOS DEL FORMULARIO
        const { productName, price, image, categoryId } = e.target as HTMLFormElement;
        const product = {
            name: productName.value,
            price: price.value,
            image: image.files[0],
            categoryId: categoryId.value,
        }

        console.log(categoryId.value)
        // VALIDACION DE LOS DATOS
        if( productName.value.trim() === ''){
            setIsLoading(false);
            toast.warning('Debe agregar un nombre');
            return;
        }if (price.value.trim() === ''){
            setIsLoading(false);
            toast.warning('Debe agregar un precio');
            return;
        }if (!image.files){
            setIsLoading(false);
            toast.warning('Debe agregar una imagen');
            return;
        }if (categoryId === null){
            setIsLoading(false);
            toast.warning('Debe seleccionar una categoria');
            return;
        }

        
        // PREPARAR PREVIEW DE LA IMAGEN
        
        // TODO?: create product action
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', product.image);
        formData.append('categoryId', product.categoryId);

        await createProduct(formData)
        
        // LIMPIAR DATOS Y CERRAR MODAL
        setIsLoading(false);
        onClose()

    }

    return (
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Registra un nuevo producto</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <Input
                                label="Nombre del producto"
                                fullWidth
                                name="productName"
                                id="productName"
                            />

                            <Input
                                label="Precio del producto"
                                fullWidth
                                type="number"
                                name="price"
                                id="price"
                                min={0}
                                step='0.01'
                            />

                            {
                                previewImage !== ''
                                && (
                                    <img src={ previewImage } className='w-full' />
                                )
                            }

                            <input onChange={handleFile} type="file" name='image' id="image" />

                            <Select
                                label="Selecciona la categoria"
                                placeholder="Selector de categoria"
                                name='categoryId'
                            >
                                {categories.map((category) => (
                                    <SelectItem onClick={
                                        () => setCategoryId(category.id)
                                    } key={ category.id } value={ category.id }>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            <div className='mb-4 flex justify-end gap-4 mt-4 items-center'>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button isLoading={ isLoading } isDisabled={ isLoading } color="primary" type='submit' >
                                    Guardar
                                </Button>
                            </div>

                        </form>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    );
}
