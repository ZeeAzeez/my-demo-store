import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  shopifyFetch,
  GQL_CART_CREATE,
  GQL_CART_LINES_ADD,
  GQL_CART_QUERY,
  GQL_CART_LINES_REMOVE,
} from "../../../lib/shopify";

function setCartCookie(id) {
  const c = cookies();
  c.set("cartId", id, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function GET() {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return NextResponse.json({ cart: null }, { status: 200 });
  try {
    const data = await shopifyFetch(GQL_CART_QUERY, { id: cartId }, { next: { revalidate: 0 } });
    return NextResponse.json({ cart: data.cart }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const data = await shopifyFetch(GQL_CART_CREATE, { input: {} }, { next: { revalidate: 0 } });
    const id = data?.cartCreate?.cart?.id;
    if (id) setCartCookie(id);
    return NextResponse.json({ cartId: id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { variantId, quantity = 1 } = await request.json();
    if (!variantId) return NextResponse.json({ error: "variantId is required" }, { status: 400 });

    let cartId = cookies().get("cartId")?.value;
    if (!cartId) {
      const created = await shopifyFetch(GQL_CART_CREATE, { input: {} }, { next: { revalidate: 0 } });
      cartId = created?.cartCreate?.cart?.id;
      if (cartId) setCartCookie(cartId);
    }

    const data = await shopifyFetch(GQL_CART_LINES_ADD, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    }, { next: { revalidate: 0 } });

    return NextResponse.json({ ok: true, cartId: data?.cartLinesAdd?.cart?.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { lineId } = await request.json();
    const cartId = cookies().get("cartId")?.value;
    if (!cartId || !lineId) return NextResponse.json({ error: "cartId/lineId missing" }, { status: 400 });
    const data = await shopifyFetch(GQL_CART_LINES_REMOVE, { cartId, lineIds: [lineId] }, { next: { revalidate: 0 } });
    return NextResponse.json({ ok: true, cartId: data?.cartLinesRemove?.cart?.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
