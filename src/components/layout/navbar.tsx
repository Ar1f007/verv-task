import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import CartIcon from "../modules/cart/cart-icon";

const Navbar = () => {

    return (
        <header className="h-20 bg-card shadow-xs">
            <nav className="container mx-auto h-full flex justify-between gap-1 px-4">
                <div className="flex items-center">
                    <Link href="/">
                        <strong className="text-xl uppercase font-bold">Verv</strong>
                    </Link>
                </div>
                <ul className="hidden md:flex md:items-center md:gap-5">
                    <li>
                        <Link
                            href="/"
                            className="uppercase hover:underline font-medium tracking-wide whitespace-nowrap"
                        >
                            All Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="add-product"
                            className="uppercase hover:underline font-medium tracking-wide whitespace-nowrap"
                        >
                            Add Product
                        </Link>
                    </li>
                </ul>
                
                <CartIcon />
            </nav>
        </header>
    )
}

export default Navbar;