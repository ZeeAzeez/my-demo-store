import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { shopifyFetch, GQL_CART_QUERY } from "../../lib/shopify";
import { formatMoney } from "../../utils/money";

export const revalidate = 0;

async function getCartFromCookie() {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return null;
  try {
    const data = await shopifyFetch(GQL_CART_QUERY, { id: cartId }, { next: { revalidate: 0 } });
    return data?.cart || null;
  } catch {
    return null;
  }
}

export default async function CartPage() {
  const cart = await getCartFromCookie();

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-4">Your cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <Link href="/products" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  const lines = cart.lines?.edges?.map(e => e.node) || [];

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {lines.map(line => (
            <div key={line.id} className="card flex items-center gap-4">
              {line.merchandise?.image?.url && (
                <Image
                  src={line.merchandise.image.url}
                  alt={line.merchandise.image.altText || line.merchandise?.product?.title || "Item"}
                  width={96} height={96}
                  className="rounded-xl object-cover"
                />
              )}
              <div className="flex-1">
                <div className="font-medium">{line.merchandise?.product?.title}</div>
                <div className="text-sm text-gray-600">{line.merchandise?.title}</div>
                <div className="mt-1 text-sm">{formatMoney(line.cost?.amountPerQuantity || {amount: 0, currencyCode: 'USD'})}</div>
              </div>
              <div className="text-sm text-gray-600">Qty: {line.quantity}</div>
            </div>
          ))}
        </div>

        <aside className="card">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(cart.cost?.subtotalAmount)}</span></div>
            {cart.cost?.totalTaxAmount?.amount && (
              <div className="flex justify-between"><span>Tax</span><span>{formatMoney(cart.cost.totalTaxAmount)}</span></div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t mt-2"><span>Total</span><span>{formatMoney(cart.cost?.totalAmount)}</span></div>
          </div>
          <a href={cart.checkoutUrl} className="btn btn-primary w-full mt-6">Checkout</a>
          <p className="mt-2 text-xs text-gray-500">You’ll complete your purchase on Shopify’s secure checkout.</p>
        </aside>
      </div>
    </div>
  );
}
