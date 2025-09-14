import Link from "next/link";
import ProductGrid from "./products/ProductGrid";

export const revalidate = 60;

export default function Home() {
  return (
    <div>
      <section className="container pt-10 md:pt-16">
        <div className="rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 md:p-16 shadow-soft">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">A beautiful demo storefront</h1>
          <p className="mt-4 text-gray-300 max-w-2xl">
            Powered by Shopify Storefront API and Next.js App Router. Clean UI, fast loads, modern architecture.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/products" className="btn bg-white text-gray-900">Shop products</Link>
            <Link href="/search" className="btn border border-white/20">Search</Link>
          </div>
        </div>
      </section>

      <section className="container mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New arrivals</h2>
          <Link href="/products" className="text-sm text-gray-600 hover:underline">View all</Link>
        </div>
        <ProductGrid first={8} />
      </section>
    </div>
  );
}
