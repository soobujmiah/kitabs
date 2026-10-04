import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="inner-page"><p className="eyebrow">Page not found</p><h1>That shelf is empty.</h1><p>The page may have moved, or this book is not available here.</p><Link className="button" href="/">Return to the library</Link></main>;
}
