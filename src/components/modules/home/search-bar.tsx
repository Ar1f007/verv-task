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
        <div className="relative mb-4 max-w-lg">
            <SearchIcon
                aria-hidden
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search products"
                className="w-full pl-10 pr-4 py-2 h-12 border border-gray-300 rounded-md focus:outline-2 focus:outline-gray-800 focus:outline-offset-2"
            />
        </div>
    );
}