import { useQuery } from "@tanstack/react-query";

import Skeleton from "@/components/ui/skeleton";
import { productService } from "@/lib/services/product";

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (val: string) => void;
}

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
    staleTime: 1000 * 60 * 10,
  });

  const allCategories = ["all", ...(data || [])];

  return (
    <>
      {/* Mobile horizontal scroll */}
      <div className="md:hidden sticky top-0 z-20 bg-white">
        <div className="mx-auto w-[90vw] flex gap-2 overflow-x-auto px-2 py-4">
          {isLoading
            ? <div role="status" aria-live="polite" aria-busy="true">
              <p className="sr-only">Loading categories...</p>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-8 w-24 rounded-md" aria-hidden />
              ))}
            </div>
            : allCategories.map((cat, idx) => (
              <button
                key={`${cat}-${idx}`}
                onClick={() => onSelectCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`shrink-0 rounded-md px-4 py-2 text-sm transition ${selectedCategory === cat
                  ? "bg-black text-white font-semibold"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
        </div>
      </div>

      {/* Desktop vertical list */}
      <div className="hidden md:block md:w-64 border-r border-gray-200">
        <div className="sticky top-0 overflow-y-auto p-4">
          {isLoading
            ? <div role="status" aria-live="polite" aria-busy="true">
              <p className="sr-only">Loading categories...</p>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-8 w-16 rounded-md" aria-hidden />
              ))}
            </div>
            : allCategories.map((cat, idx) => (
              <button
                key={`${cat}-${idx}`}
                onClick={() => onSelectCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`cursor-pointer w-full text-left px-4 py-2 rounded-md transition ${selectedCategory === cat
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
