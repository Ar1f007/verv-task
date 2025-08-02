import Skeleton from "@/components/ui/skeleton";

export default function ProductsSkeleton(){
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
    )
}