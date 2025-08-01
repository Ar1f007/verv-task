"use client";

import { useState } from "react";
import ProductGrid from "../products/product-grid";
import CategorySelector from "./category-selector";

export default function HomeContent() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");


    return (
        <section className="flex flex-col md:flex-row min-h-screen">

            <CategorySelector onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />

            <main className="flex-1 p-4">
                <ProductGrid category={selectedCategory} />
            </main>
        </section>
    );
}