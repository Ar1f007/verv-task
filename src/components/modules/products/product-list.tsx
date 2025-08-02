import { Product } from "@/lib/types/product";
import Link from "next/link";
import AddToCartButton from "../cart/cart-add-btn";
import { formatPrice } from "@/lib/utils";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({products}: ProductListProps) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-2 border border-gray-300 rounded-xl p-4 hover:shadow-md transition"
          >
            <Link
              href={`/products/${product.id}`}
              className="flex flex-col gap-2 size-full justify-between"
            >
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square w-full object-contain mix-blend-multiply"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
              <div className="flex justify-between items-center gap-1 mt-auto">
                <p className="font-bold text-md">{formatPrice(product.price)}</p>
                <span className="text-xs font-medium text-gray-800 bg-gray-200 px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              </div>
            </Link>
            <AddToCartButton product={product} />
          </li>
        ))}
      </ul>
    )
}