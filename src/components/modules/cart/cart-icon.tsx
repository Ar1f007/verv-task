"use client";

import { useCart } from "@/lib/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const count = useCart((state) => state.getCount());

  return (
     <Link href="/cart" className="flex items-center relative">
      <ShoppingCart className="size-6" aria-hidden />
      <span className="sr-only">
        Cart with ${count} item {count === 1 ? '' : 's'}
      </span>
      {count > 0 && (
        <span 
        className="absolute -top-2.5 -right-2 bg-red-500 text-white text-[10px] font-semibold size-5 rounded-full flex items-center justify-center"
        aria-hidden
        >
          {count}
        </span>
      )}
    </Link>
  );
}
