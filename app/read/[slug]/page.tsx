import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/data/static-repository";
import { loadChapter } from "@/lib/reader";
import { canonicalPath } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const published = await books.listBooks();
  return published.filter((book) => book.readerContentId).map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await books.getBookBySlug(slug);
  if (!book || !book.readerContentId) return {};
  return { title: `Read ${book.title}`, description: `Read ${book.title} by ${book.authors.join(", ")}.`, alternates: { canonical: canonicalPath(`/read/${slug}/`) } };
}

export default async function ReaderPage({ params }: Props) {
  const { slug } = await params;
  const book = await books.getBookBySlug(slug);
  if (!book || !book.readerContentId) notFound();
  const reader = await books.getReaderContent(book.id);
  if (!reader) notFound();
  const chapters = [...reader.chapters].sort((a, b) => a.order - b.order);
  return (
    <main id="main" className="reader-page">
      <div className="reader-head"><Link href={`/books/${slug}/`}>← About this book</Link><p className="eyebrow">{reader.extent === "preview" ? "Sample chapter" : "Kitabs reader"}</p><h1>{book.title}</h1><p>By {book.authors.join(", ")}</p>{reader.extent === "preview" && <p>This edition currently includes a sample chapter.</p>}</div>
      <nav aria-label="Chapters" className="toc"><h2>Contents</h2><ol>{chapters.map((chapter) => <li key={chapter.id}><a href={`#${chapter.id}`}>{chapter.title}</a></li>)}</ol></nav>
      {chapters.map((chapter) => <section className="chapter" id={chapter.id} key={chapter.id} aria-labelledby={`${chapter.id}-title`}><h2 id={`${chapter.id}-title`}>{chapter.title}</h2><div dangerouslySetInnerHTML={{ __html: loadChapter(chapter.sourcePath) }} /></section>)}
    </main>
  );
}
