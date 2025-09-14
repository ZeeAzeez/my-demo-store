# Shopify + Next.js Storefront (Demo, with Search & Variant Selectors)

A beautiful, minimal headless storefront built with **Next.js App Router** and the **Shopify Storefront GraphQL API**.
Includes search, variant selection, cart, and checkout.

## Features

- Product grid, product detail pages with **variant selectors**
- **Search** page and header search
- Persistent Cart (cookie) using Storefront **Cart API** → redirect to `checkoutUrl`
- Clean Tailwind UI, responsive

## Quickstart

1. Install deps

```bash
npm i
```

2. Create `.env.local` (see `.env.example`):

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx
SHOPIFY_API_VERSION=2025-04
```

3. Ensure Storefront scopes: `unauthenticated_read_product_listings`
   (optional: tags/selling plans if you use them)

4. Run dev:

```bash
npm run dev
```

Open http://localhost:3000
