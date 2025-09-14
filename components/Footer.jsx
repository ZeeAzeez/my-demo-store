export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Demo Shop. Built with Next.js + Shopify.</p>
        
      </div>
    </footer>
  );
}
