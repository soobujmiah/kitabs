import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, loadStaticRecords } from "@/data/static-repository";
import { canonicalPath, publicAsset } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await books.listBooks()).map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await books.getBookBySlug(slug);
  if (!book) return {};
  const cover = loadStaticRecords().assets.find((asset) => asset.id === book.coverAssetId);
  return {
    title: book.title,
    description: book.description,
    alternates: { canonical: canonicalPath(`/books/${slug}/`) },
    openGraph: { title: book.title, description: book.description, type: "book", images: cover ? [publicAsset(cover.path)] : [] },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = await books.getBookBySlug(slug);
  if (!book) notFound();
  const cover = loadStaticRecords().assets.find((asset) => asset.id === book.coverAssetId);
  if (!cover) throw new Error(`Cover missing for ${slug}`);
  const reader = await books.getReaderContent(book.id);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: book.authors.map((name) => ({ "@type": "Person", name })),
    inLanguage: book.language,
    description: book.description,
    url: canonicalPath(`/books/${slug}/`),
  };
  return (
    <main id="main" className="inner-page">
      <Link href="/">← Back to library</Link>
      <article className="detail-layout">
        <img className="detail-cover" src={publicAsset(cover.path)} alt={cover.alt} width={cover.width ?? 400} height={cover.height ?? 560} />
        <div><p className="eyebrow">{book.categoryId}</p><h1>{book.title}</h1>{book.subtitle && <p className="subtitle">{book.subtitle}</p>}<p className="byline">By {book.authors.join(", ")}</p><p className="lead">{book.description}</p><dl className="metadata"><div><dt>Language</dt><dd>{book.language}</dd></div>{book.publishedYear && <div><dt>Published</dt><dd>{book.publishedYear}</dd></div>}{book.publisher && <div><dt>Publisher</dt><dd>{book.publisher}</dd></div>}</dl>{reader ? <Link className="button" href={`/read/${slug}/`}>{reader.extent === "preview" ? "Read sample chapter ↗" : "Read this book ↗"}</Link> : <p>Reading preview is not available for this title.</p>}</div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
