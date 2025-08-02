import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchbarProps {
    onSearch: (val: string) => void;
    delay?: number;
}

export default function Searchbar({
    onSearch,
    delay = 500,
}: SearchbarProps) {

    const [value, setValue] = useState<string>("");
    const [debounced, setDebounced] = useState(value);


    useEffect(() => {
        const debounceHandler = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => clearTimeout(debounceHandler)
    }, [value, delay]);


    useEffect(() => {
        onSearch(debounced);
    }, [debounced]);


    return (
        <div className="mb-4 w-full max-w-lg relative">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-200 rounded-md pl-8 h-12 bg-white"
            />

            <SearchIcon aria-hidden className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400 focus-visible:outline-offset-2 focus-visible:outline-offset-gray-200" />
        </div>
    );
}