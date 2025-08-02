"use client";

import { useCart } from "@/lib/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const items = useCart((state) => state.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
     <Link href="/cart" className="flex items-center relative">
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute top-5 -right-2 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
