import HomeContent from "@/components/modules/home/homepage-content";
import ProductGrid from "@/components/modules/products/product-grid";
import { productService } from "@/lib/services/product";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: productService.getAll,
  });

 await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['products', 'all'],
      queryFn: productService.getAll,
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: productService.getCategories,
    }),
  ])

  return (
     <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeContent />
     </HydrationBoundary>
  );
}
