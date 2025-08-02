"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { MinusCircleIcon, MinusIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react";

import { useCart } from "@/lib/store/cart";
import { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";


export default function CartPage() {
    const { items, remove, clear, getTotal, increase, decrease } = useCart();

    if (items.length === 0) {
        return (
            <section className="max-w-3xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <Link
                    href={ROUTES.home}
                    className="inline-flex gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                >
                    <ShoppingBagIcon aria-hidden />  Continue Shopping
                </Link>
            </section>
        );
    }


    function handleRemove(id: Product['id']) {
        remove(id);
        toast.success("Item removed");
    }

    function handleCheckout() {
        toast.success("Thank you for shopping with verv");
        clear();
    };


    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            {/* Items */}
            <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4"
                    >
                        <div className="flex gap-4">
                            <div className="relative size-20 shrink-0 border border-gray-200">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-md text-gray-500">
                                    {formatPrice(item.price)} × {item.quantity}
                                </p>

                                {/* Item inc-dec */}
                                <div className="flex items-center gap-1 mt-2" aria-label={`Quantity controls for ${item.title}`}>
                                    <button
                                        onClick={() => {
                                            decrease(item.id);

                                            if (item.quantity <= 1) {
                                                toast.error("Item removed");
                                            }
                                        }}
                                        className="text-gray-700 hover:text-gray-900 transition cursor-pointer border border-gray-300 rounded"
                                        aria-label={`Decrease quantity for ${item.title}`}
                                    >
                                        <MinusIcon className="size-6" aria-hidden />
                                    </button>
                                    <span className="w-8 text-center text-lg" aria-live="polite">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => increase(item.id)}
                                        className="text-gray-700 hover:text-gray-900 transition cursor-pointer border border-gray-300 rounded"
                                        aria-label={`Increase quantity for ${item.title}`}
                                    >
                                        <PlusIcon className="size-6" aria-hidden />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-4">
                            <p className="text-lg font-semibold text-green-700">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="cursor-pointer text-sm text-red-600 hover:underline"
                            >
                                <span className="sr-only">
                                    Remove item id {item.id} named {item.title}
                                </span>
                                <Trash2Icon className="size-5" aria-hidden />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total and Action buttons */}
            <div className="mt-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 border-t border-t-gray-200 pt-6">
                <p className="text-lg font-semibold">
                    Total:{" "}
                    <span className="text-green-700">
                        {formatPrice(getTotal())}
                    </span>
                </p>
                <div className="flex gap-4">
                    <button
                        className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={clear}
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="cursor-pointer bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </section>
    );
}