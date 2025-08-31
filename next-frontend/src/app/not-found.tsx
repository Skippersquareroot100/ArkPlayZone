import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-theme text-theme">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 opacity-80">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg font-medium text-white
                   bg-gradient-to-b from-[var(--color-accent-hover)] to-[var(--color-text)] 
                   hover:from-[var(--color-text)] hover:to-[var(--color-accent-hover)] 
                   transition transform active:-translate-y-1"
      >
        Go back home
      </Link>
    </main>
  );
}
