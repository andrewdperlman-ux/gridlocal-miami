import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🏎️</div>
        <h1 className="text-4xl font-black text-secondary mb-3">404 — Page Not Found</h1>
        <p className="text-muted text-lg mb-8 max-w-md mx-auto">
          Looks like this page took a wrong turn at Brickell. Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/articles" className="btn-secondary">
            Browse Articles
          </Link>
          <Link href="/listings" className="btn-secondary">
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
