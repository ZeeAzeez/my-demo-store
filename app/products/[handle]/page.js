import Image from "next/image";
import { shopifyFetch, GQL_PRODUCT_BY_HANDLE } from "../../../lib/shopify";
import { formatMoney } from "../../../utils/money";
import VariantSelector from "../../../components/VariantSelector";

export const revalidate = 60;

export default async function ProductDetail({ params }) {
  const { handle } = params;
  const data = await shopifyFetch(GQL_PRODUCT_BY_HANDLE, { handle });
  const product = data?.product;

  if (!product) {
    return <div className="container py-10"><p>Product not found.</p></div>
  }

  const firstVariant = product.variants?.nodes?.[0];
  const price = firstVariant?.price;

  return (
    <div className="container py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-4">
        {product.images?.nodes?.[0]?.url ? (
          <Image
            src={product.images.nodes[0].url}
            alt={product.images.nodes[0].altText || product.title}
            width={product.images.nodes[0].width || 1200}
            height={product.images.nodes[0].height || 1200}
            className="rounded-3xl w-full object-cover"
          />
        ) : (
          <div className="aspect-square rounded-3xl bg-gray-100 grid place-items-center text-gray-400">No image</div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
        {price && <p className="mt-2 text-xl text-gray-700">{formatMoney(price)}</p>}
        <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

        <div className="mt-8">
          <VariantSelector options={product.options || []} variants={product.variants?.nodes || []} />
        </div>
      </div>
    </div>
  );
}
