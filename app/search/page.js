import ProductGrid from "../products/ProductGrid";

export const revalidate = 60;

export default function SearchPage({ searchParams }) {
  const q = searchParams?.q ? String(searchParams.q) : "";
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <form action="/products" className="flex gap-3 mb-6">
        <input
          name="q"
          defaultValue={q}
          className="w-full rounded-2xl border px-4 py-2"
          placeholder="E.g. shoes, hoodie, summer"
        />
        <button className="btn btn-primary">Search</button>
      </form>
      {q ? (
        <ProductGrid first={24} query={q} />
      ) : (
        <p className="text-gray-600">Enter a keyword to search products.</p>
      )}
    </div>
  );
}
