import Link from "next/link";
import type { Book, BookAsset } from "@/domain/book";
import { publicAsset } from "@/lib/site";

export function BookCard({ book, cover }: { book: Book; cover: BookAsset }) {
  return (
    <article className="book-card">
      {/* Public records are validated before build; the cover path comes from the asset registry. */}
      <img src={publicAsset(cover.path)} alt={cover.alt} width={cover.width ?? 320} height={cover.height ?? 440} loading="lazy" />
      <div>
        <p className="eyebrow">{book.categoryId}</p>
        <h3><Link href={`/books/${book.slug}/`}>{book.title}</Link></h3>
        <p>{book.authors.join(", ")}</p>
        <p>{book.readerContentId ? "Reading sample available" : "Catalogue only"}</p>
      </div>
    </article>
  );
}
