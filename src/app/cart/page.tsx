"use client";

import { useCart } from "@/lib/store/cart";
import { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function CartPage() {
    const { items, remove, clear, getTotal } = useCart();

    if (items.length === 0) {
        return (
            <section className="max-w-3xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                >
                    Continue Shopping
                </Link>
            </section>
        );
    }


    function handleRemove(id: Product['id']) {
        remove(id);
        toast.success("Item removed");
    }

    const handleCheckout = () => {
        toast.success("Thank you for shopping with verv");
        clear();
    };


    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 shrink-0 border border-gray-200">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">
                                    {formatPrice(item.price)} × {item.quantity}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                            <p className="text-sm font-semibold text-green-700">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="cursor-pointer text-sm text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-t border-t-gray-200 pt-6">
                <p className="text-lg font-semibold">
                    Total:{" "}
                    <span className="text-green-700">
                        {formatPrice(getTotal())}
                    </span>
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={clear}
                        className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        Clear Cart
                    </button>
                    <button
                        className="cursor-pointer bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>


            </div>
        </section>
    );
}