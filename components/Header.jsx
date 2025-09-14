"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const qq = q.trim();
    if (qq) router.push(`/products?q=${encodeURIComponent(qq)}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container flex items-center justify-between py-4 gap-4">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          U-<span className="text-gray-500">Sell</span>
        </Link>

        <form onSubmit={onSubmit} className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-2xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
            <button className="btn btn-primary" type="submit">Search</button>
        </form>

        <nav className="flex items-center gap-4">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/cart" className="btn btn-outline">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
