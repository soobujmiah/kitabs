import type { Metadata } from "next";
import Link from "next/link";
import { siteOrigin } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "Kitabs — A library to enter", template: "%s | Kitabs" },
  description: "Explore a library of rights-cleared books through a cinematic and accessible reading experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to books</a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Kitabs home">KITABS<span className="brand-mark">✦</span></Link>
          <nav aria-label="Primary"><Link href="/#collections">Collections</Link><Link href="/#books">Books</Link></nav>
        </header>
        {children}
        <footer className="site-footer"><p>Kitabs · A library to enter</p><p>Only rights-cleared books are published.</p></footer>
      </body>
    </html>
  );
}
