"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query"

import { productService } from "@/lib/services/product"
import Searchbar from "../home/search-bar";
import ProductsSkeleton from "./product-skeleton";
import NoProductState from "./no-product";
import ProductList from "./product-list";


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


  const filteredData = (data || []).filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <section>

      <Searchbar onSearch={setSearchTerm} />

      {
        isLoading
          ? <ProductsSkeleton />
          : error
            ? <div className="text-red-500">Failed to load products</div>
            : !data || data.length === 0
              ? <NoProductState />
              : filteredData.length > 0 
                ? <ProductList products={filteredData} />
                : <NoProductState hint="Try searching with a different keyword." />
      }


    </section>
  )
}

export default ProductGrid;