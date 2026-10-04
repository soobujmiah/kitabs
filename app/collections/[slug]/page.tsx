import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, loadStaticRecords } from "@/data/static-repository";
import { BookCard } from "@/components/catalogue/book-card";
import { canonicalPath } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await books.listCollections()).map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = (await books.listCollections()).find((item) => item.slug === slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.description, alternates: { canonical: canonicalPath(`/collections/${slug}/`) } };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = (await books.listCollections()).find((item) => item.slug === slug);
  if (!collection) notFound();
  const published = (await books.listBooks()).filter((book) => book.collectionIds.includes(collection.id));
  const covers = new Map(loadStaticRecords().assets.map((asset) => [asset.id, asset]));
  return <main id="main" className="inner-page"><Link href="/">← All collections</Link><p className="eyebrow">Collection</p><h1>{collection.title}</h1><p className="lead">{collection.description}</p>{published.length ? <div className="book-grid">{published.map((book) => <BookCard key={book.id} book={book} cover={covers.get(book.coverAssetId)!} />)}</div> : <p className="empty-state">No rights-cleared books in this collection yet.</p>}</main>;
}
