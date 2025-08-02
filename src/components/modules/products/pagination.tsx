import { ChevronDownIcon } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (count: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    return (
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex justify-between items-center w-full lg:w-auto gap-4">
                <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                    <label htmlFor="itemsPerPage" className="text-sm">Items per page:</label>
                    <div className="relative">
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="border rounded-md px-2 py-1 text-sm appearance-none pr-6 cursor-pointer"
                        >
                            {[4, 8, 12, 20].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <ChevronDownIcon
                            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 size-4.5"
                            aria-hidden
                        />
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-center gap-4">
                <div className="hidden lg:flex items-center gap-2">
                    <label htmlFor="itemsPerPage" className="text-sm">Items per page:</label>
                    <div className="relative">
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="border rounded-md px-2 py-1 text-sm appearance-none pr-6 cursor-pointer"
                        >
                            {[4, 8, 12, 20].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <ChevronDownIcon
                            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 size-4.5"
                            aria-hidden
                        />
                    </div>
                </div>


                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 cursor-pointer"
                >
                    Previous
                </button>

                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
