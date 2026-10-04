import { describe, expect, it } from "vitest";
import { bookSchema, rightsRecordSchema } from "../src/domain/book";
import { validateRecords } from "../src/data/static-repository";
import { renderSafeMarkdown } from "../src/lib/reader";

const fixtureRight = rightsRecordSchema.parse({
  id: "fixture-right", basis: "restricted", source: "test fixture", jurisdiction: "test",
  attribution: "", allowedActions: ["metadata"], evidencePath: "docs/rights/test-fixture.md",
  reviewedAt: "2026-10-04", verificationStatus: "pending",
});
const fixtureBook = bookSchema.parse({
  id: "fixture-book", slug: "fixture-book", title: "Fixture Book", authors: ["Test Author"],
  description: "Only for tests.", language: "en", categoryId: "fixture", tagIds: [], collectionIds: ["fixture"],
  coverAssetId: "fixture-cover", readerContentId: null, featured: false, sortOrder: 1,
  rightsId: "fixture-right", status: "draft",
});
const collection = { id: "fixture", slug: "fixture", title: "Fixture", description: "Test collection", sortOrder: 1 };
const asset = { id: "fixture-cover", kind: "cover" as const, path: "/assets/books/covers/pride-and-prejudice.svg", alt: "Test cover", bytes: 1372, rightsId: "fixture-right" };
const fixture = { books: [fixtureBook], collections: [collection], assets: [asset], rights: [fixtureRight], readers: [] };

describe("content publication gates", () => {
  it("accepts a draft fixture without publishing it", () => expect(() => validateRecords(fixture)).not.toThrow());
  it("rejects publishing a book with unverified rights", () => {
    expect(() => validateRecords({ ...fixture, books: [{ ...fixtureBook, status: "published" }] })).toThrow(/publication rights/);
  });
  it("rejects duplicate slugs", () => {
    expect(() => validateRecords({ ...fixture, books: [fixtureBook, { ...fixtureBook, id: "other" }] })).toThrow(/Duplicate book slug/);
  });
});

describe("reader text", () => {
  it("escapes raw markup while preserving simple paragraphs and headings", () => {
    expect(renderSafeMarkdown("# Chapter\n\n<script>alert(1)</script>")).toBe("<h2>Chapter</h2>\n<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>");
  });
});
