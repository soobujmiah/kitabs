import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { bookSchema, bookAssetSchema, collectionSchema, readerContentSchema, rightsRecordSchema } from "../domain/book";
import type { Book, BookAsset, Collection, ReaderContent, RightsRecord } from "../domain/book";
import type { BookRepository } from "./repository";

const root = process.cwd();

function readDirectory<T>(path: string, parse: (value: unknown) => T): T[] {
  const directory = join(root, "content", path);
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => parse(JSON.parse(readFileSync(join(directory, name), "utf8"))));
}

export function loadStaticRecords() {
  const books = readDirectory("books", (value) => bookSchema.parse(value));
  const collections = readDirectory("collections", (value) => collectionSchema.parse(value));
  const assets = readDirectory("assets", (value) => bookAssetSchema.parse(value));
  const rights = readDirectory("rights", (value) => rightsRecordSchema.parse(value));
  const readers = readDirectory("readers", (value) => readerContentSchema.parse(value));
  validateRecords({ books, collections, assets, rights, readers });
  return { books, collections, assets, rights, readers };
}

export function validateRecords(records: {
  books: Book[];
  collections: Collection[];
  assets: BookAsset[];
  rights: RightsRecord[];
  readers: ReaderContent[];
}): void {
  const unique = (label: string, values: string[]) => {
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`);
  };
  unique("book id", records.books.map((book) => book.id));
  unique("book slug", records.books.map((book) => book.slug));
  unique("collection id", records.collections.map((collection) => collection.id));
  unique("collection slug", records.collections.map((collection) => collection.slug));
  unique("asset id", records.assets.map((asset) => asset.id));
  unique("rights id", records.rights.map((right) => right.id));
  unique("reader id", records.readers.map((reader) => reader.id));

  const collectionIds = new Set(records.collections.map((x) => x.id));
  const assets = new Map(records.assets.map((x) => [x.id, x]));
  const rights = new Map(records.rights.map((x) => [x.id, x]));
  const readers = new Map(records.readers.map((x) => [x.id, x]));

  for (const right of records.rights) {
    if (!/^docs\/rights\/[a-z0-9/_-]+\.md$/.test(right.evidencePath) || !existsSync(join(root, right.evidencePath))) {
      throw new Error(`Missing rights evidence for ${right.id}`);
    }
  }

  for (const asset of records.assets) {
    if (!rights.has(asset.rightsId)) throw new Error(`Missing rights for asset ${asset.id}`);
    const assetFile = join(root, "public", asset.path);
    if (!existsSync(assetFile)) throw new Error(`Missing file for asset ${asset.id}`);
    if (statSync(assetFile).size !== asset.bytes) throw new Error(`Asset size mismatch for ${asset.id}`);
    if (asset.kind === "cover" && !asset.alt.trim()) throw new Error(`Missing cover alt for ${asset.id}`);
  }
  for (const book of records.books) {
    if (!collectionIds.has(book.categoryId)) throw new Error(`Missing category ${book.categoryId}`);
    for (const id of book.collectionIds) if (!collectionIds.has(id)) throw new Error(`Missing collection ${id}`);
    const cover = assets.get(book.coverAssetId);
    if (!cover || cover.kind !== "cover") throw new Error(`Missing cover for ${book.slug}`);
    const right = rights.get(book.rightsId);
    if (!right) throw new Error(`Missing rights for ${book.slug}`);
    if (book.status === "published") {
      if (right.verificationStatus !== "verified" || right.basis === "restricted" || !right.allowedActions.includes("metadata") || !right.allowedActions.includes("display")) {
        throw new Error(`Book ${book.slug} lacks publication rights`);
      }
      const coverRight = rights.get(cover.rightsId);
      if (!coverRight || coverRight.verificationStatus !== "verified" || coverRight.basis === "restricted" || !coverRight.allowedActions.includes("display")) {
        throw new Error(`Cover ${cover.id} lacks publication rights`);
      }
    }
    if (book.readerContentId) {
      const reader = readers.get(book.readerContentId);
      if (!reader || reader.bookId !== book.id) throw new Error(`Missing reader for ${book.slug}`);
      const readerRight = rights.get(reader.rightsId);
      if (book.status === "published" && (!readerRight || readerRight.verificationStatus !== "verified" || readerRight.basis === "restricted" || !readerRight.allowedActions.includes("read"))) {
        throw new Error(`Reader ${reader.id} lacks reading rights`);
      }
      unique(`chapter id for ${book.slug}`, reader.chapters.map((chapter) => chapter.id));
      unique(`chapter order for ${book.slug}`, reader.chapters.map((chapter) => String(chapter.order)));
      for (const chapter of reader.chapters) if (!existsSync(join(root, chapter.sourcePath))) throw new Error(`Missing chapter ${chapter.sourcePath}`);
    }
  }
  for (const reader of records.readers) {
    if (!records.books.some((book) => book.id === reader.bookId && book.readerContentId === reader.id)) {
      throw new Error(`Orphan reader ${reader.id}`);
    }
  }
}

export class StaticBookRepository implements BookRepository {
  async listCollections() {
    return loadStaticRecords().collections.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async listBooks() {
    return loadStaticRecords().books.filter((book) => book.status === "published").sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getBookBySlug(slug: string) {
    return (await this.listBooks()).find((book) => book.slug === slug) ?? null;
  }

  async getReaderContent(bookId: string) {
    const { readers } = loadStaticRecords();
    return readers.find((reader) => reader.bookId === bookId) ?? null;
  }
}

export const books = new StaticBookRepository();
