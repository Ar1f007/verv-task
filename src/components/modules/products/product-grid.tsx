"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query"

import { productService } from "@/lib/services/product"
import Searchbar from "../home/search-bar";
import ProductsSkeleton from "./product-skeleton";
import NoProductState from "./no-product";
import ProductList from "./product-list";
import SortMenu, { SortOption } from "./sort-menu";


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
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const filteredData = (data || []).filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "rating_asc":
        return a.rating.rate - b.rating.rate;
      case "rating_desc":
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  return (
    <section>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <Searchbar onSearch={setSearchTerm} />
        <SortMenu value={sortOption} onSortChange={setSortOption} />
      </div>

      {
        isLoading
          ? <ProductsSkeleton />
          : error
            ? <div className="text-red-500">Failed to load products</div>
            : !data || data.length === 0
              ? <NoProductState />
              : sortedData.length > 0
                ? <ProductList products={sortedData} />
                : <NoProductState hint="Try searching with a different keyword." />
      }

    </section>
  )
}

export default ProductGrid;