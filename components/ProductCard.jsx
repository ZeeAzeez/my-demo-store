import Link from "next/link";
import Image from "next/image";
import { formatMoney } from "../utils/money";

export default function ProductCard({ product }) {
  const price = product?.priceRange?.minVariantPrice;
  const img = product?.featuredImage;

  return (
    <Link href={`/products/${product.handle}`} className="card group block">
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
        {img?.url ? (
          <Image
            alt={img.altText || product.title}
            src={img.url}
            width={img.width || 800}
            height={img.height || 800}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400">No image</div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="font-semibold">{product.title}</h3>
        {price && <span className="text-sm text-gray-600">{formatMoney(price)}</span>}
      </div>
    </Link>
  );
}
