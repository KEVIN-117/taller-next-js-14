import { SideMenuCart } from "@/modules/cart";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
                    <SideMenuCart/>
                    {/* PAGINA PRINCIPAL */}
                    <div className="">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
}
