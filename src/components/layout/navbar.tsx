import Link from "next/link";

import CartIcon from "../modules/cart/cart-icon";
import { ROUTES } from "@/lib/constants";
import { PlusIcon } from "lucide-react";


const Navbar = () => {

    return (
        <header className="h-20 bg-card shadow-xs">
            <nav className="container mx-auto h-full flex justify-between gap-1 px-4">
                <div className="flex items-center">
                    <Link href={ROUTES.home}>
                        <strong className="text-xl uppercase font-bold">Verv</strong>
                    </Link>
                </div>
                
                <ul className="flex items-center gap-5">
                    {/* <li>
                        <Link
                            href={ROUTES.home}
                            className="hidden md:block uppercase hover:underline font-medium tracking-wide whitespace-nowrap"
                        >
                            Products
                        </Link>
                    </li> */}                    
                    <li>
                        <Link
                            href={ROUTES.addProduct}
                            className="uppercase hover:underline font-medium tracking-wide whitespace-nowrap flex items-center gap-1"
                        >
                            <PlusIcon aria-hidden className="size-6" />
                            <span className="sr-only">Add Product</span>
                            <span className="hidden md:inline">Add Product</span>
                        </Link>
                    </li>

                    <li>
                        <CartIcon />
                    </li>
                </ul>

                
            </nav>
        </header>
    )
}

export default Navbar;