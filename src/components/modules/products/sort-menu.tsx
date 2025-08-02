import { ChevronDownIcon } from "lucide-react";

export type SortOption =
    | "rating_desc"
    | "rating_asc"
    | "price_desc"
    | "price_asc"
    | "default";

interface SortMenuProps {
    onSortChange: (value: SortOption) => void;
    value: SortOption;
}

export default function SortMenu({ value, onSortChange }: SortMenuProps) {

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: "Sort by: Default", value: "default" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
        { label: "Rating: Low to High", value: "rating_asc" },
        { label: "Rating: High to Low", value: "rating_desc" },
    ];

    return (
        <div className="flex items-center gap-2 justify-end order-1 md:order-2">
            <label htmlFor="sort" className="text-sm font-medium">
                Sort:
            </label>
            <div className="relative">
                <select
                    id="sort"
                    name="sort"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-gray-600 
                    focus-visible:outline-offset-2 appearance-none pr-8 cursor-pointer"
                    value={value}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                >
                    {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 size-4.5"
                    aria-hidden
                />
            </div>
        </div>

    );
}