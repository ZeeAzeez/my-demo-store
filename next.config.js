/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdn.shopify.com' },
      { protocol: 'https', hostname: '**.myshopify.com' }
    ]
  },
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  }
};

export default nextConfig;
