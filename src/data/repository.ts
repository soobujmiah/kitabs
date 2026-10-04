import type { Book, Collection, ReaderContent } from "../domain/book";

export interface BookRepository {
  listCollections(): Promise<Collection[]>;
  listBooks(): Promise<Book[]>;
  getBookBySlug(slug: string): Promise<Book | null>;
  getReaderContent(bookId: string): Promise<ReaderContent | null>;
}
