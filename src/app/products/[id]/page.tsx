import Image from "next/image";
import { notFound } from "next/navigation";
import { StarIcon } from "lucide-react";

import { productService } from "@/lib/services/product";
import AddToCartButton from "@/components/modules/cart/cart-add-btn";
import { formatPrice } from "@/lib/utils";

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductDetailProps) {
  const product = await productService.getById(params.id);

  if (!product) return notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 lg:py-20 grid md:grid-cols-2 gap-10">
   
      <div className="relative w-full h-[400px] md:h-[500px] border border-gray-200 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 mix-blend-multiply"
        />
      </div>

   
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

        <p className="text-base text-gray-500 uppercase tracking-wide mb-3">
          {product.category}
        </p>

        <p className="text-2xl font-semibold text-green-700 mb-6">
         {formatPrice(product.price)}
        </p>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
          {product.description}
        </p>

        <p className="text-lg flex items-center gap-1 text-yellow-600 font-medium mb-8">
          <StarIcon className="fill-yellow-400 stroke-yellow-400"/> {product.rating?.rate}
          <span className="text-gray-600 font-normal">
            ({product.rating?.count} reviews)
          </span>
        </p>

        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
