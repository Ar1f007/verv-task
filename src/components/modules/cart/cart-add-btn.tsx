"use client";

import { useCart } from "@/lib/store/cart";
import { Product } from "@/lib/types/product";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCart((state) => state.add);

  function handleAddProduct(product:Product){
    addToCart(product);
    toast.success("Product added successfully");
  }

  return (
    <button
      onClick={() => handleAddProduct(product)}
      className="cursor-pointer inline-flex justify-center items-center gap-2 px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
    >
      <ShoppingCart size={16} aria-hidden />
      Add to Cart
    </button>
  );
}
