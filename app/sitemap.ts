import type { MetadataRoute } from "next";
import { books } from "@/data/static-repository";
import { canonicalPath } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, published] = await Promise.all([books.listCollections(), books.listBooks()]);
  return [
    { url: canonicalPath("/") },
    ...collections.map((collection) => ({ url: canonicalPath(`/collections/${collection.slug}/`) })),
    ...published.map((book) => ({ url: canonicalPath(`/books/${book.slug}/`) })),
    ...published.filter((book) => book.readerContentId).map((book) => ({ url: canonicalPath(`/read/${book.slug}/`) })),
  ];
}
