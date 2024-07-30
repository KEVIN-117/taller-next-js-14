import { SideMenuCart } from "@/modules/cart";
import { Toaster } from "sonner";
import {getProducts} from "@/modules/products/actions/get-product";
import {IProduct} from "@/modules/products/interfaces/product";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const products = await getProducts() as IProduct[]
    return (
        <>
            <main className="">
                <Toaster
                    position='top-right'
                    richColors
                    closeButton
                    style={{ position: 'absolute', margin: 0 }}
                />
                <div className="">
                    {/* CARRITO */}
                    <SideMenuCart products={products}/>
                    {/* PAGINA PRINCIPAL */}
                    <div className="">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
}
