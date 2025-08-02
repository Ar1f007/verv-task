"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query"

import Skeleton from "@/components/ui/skeleton";
import { productService } from "@/lib/services/product"
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "../cart/cart-add-btn";
import Searchbar from "../home/search-bar";
import { useState } from "react";


interface ProductGridProps {
  category: string;
}


const ProductGrid = ({ category }: ProductGridProps) => {


  const { data, error, isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn:
      category === 'all'
        ? productService.getAll
        : () => productService.getByCategory(category),
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div role="status" aria-live="polite" aria-busy="true">
        <p className="sr-only">Loading products...</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <li
              key={i}
              className="flex flex-col gap-2 border border-gray-300 rounded-xl p-4"
              aria-hidden
            >
              <div className="flex flex-col gap-2 size-full justify-between">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />

                <div className="flex justify-between items-center gap-1 mt-auto">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) return <div className="text-red-500">Failed to load products</div>

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm text-gray-400">Try selecting a different category or check back later.</p>
      </div>
    )
  }

  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <section>

      <div>
        <Searchbar onSearch={setSearchTerm} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-2 border border-gray-300 rounded-xl p-4 hover:shadow-md transition"
          >
            <Link
              href={`/products/${product.id}`}
              className="flex flex-col gap-2 size-full justify-between"
            >
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square w-full object-contain mix-blend-multiply"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
              <div className="flex justify-between items-center gap-1 mt-auto">
                <p className="font-bold text-md">{formatPrice(product.price)}</p>
                <span className="text-xs font-medium text-gray-800 bg-gray-200 px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              </div>
            </Link>
            <AddToCartButton product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductGrid;