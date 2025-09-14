import ProductGrid from "./ProductGrid";

export const revalidate = 60;

export default async function ProductsPage({ searchParams }) {
  const q = searchParams?.q ? String(searchParams.q) : null;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">{q ? `Search results for "${q}"` : "All products"}</h1>
      <ProductGrid first={24} query={q ? q : null} />
    </div>
  );
}
