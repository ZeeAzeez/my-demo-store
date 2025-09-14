import { shopifyFetch, GQL_PRODUCTS, GQL_PRODUCTS_QUERY } from "../../lib/shopify";
import ProductCard from "../../components/ProductCard";

export default async function ProductGrid({ first = 12, query = null }) {
  const data = query
    ? await shopifyFetch(GQL_PRODUCTS_QUERY, { first, query })
    : await shopifyFetch(GQL_PRODUCTS, { first });

  const items = data?.products?.nodes || [];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {items.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
