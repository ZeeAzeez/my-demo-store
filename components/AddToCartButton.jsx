"use client";
import { useTransition, useState } from "react";

export default function AddToCartButton({ variantId, quantity = 1, className = "" }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState("");

  async function add() {
    setMsg("");
    start(async () => {
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId, quantity }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to add to cart");
        setMsg("Added! 🛒");
        setTimeout(() => setMsg(""), 2000);
      } catch (e) {
        setMsg(e.message);
      }
    });
  }

  return (
    <button onClick={add} disabled={pending} className={`btn btn-primary ${className}`}>
      {pending ? "Adding..." : "Add to Cart"}
      {msg && <span className="ml-2 text-xs opacity-80">{msg}</span>}
    </button>
  );
}
