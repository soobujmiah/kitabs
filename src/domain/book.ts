import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const id = z.string().min(1);
const safeAssetPath = z.string().regex(/^\/assets\/[a-z0-9/_-]+\.(?:avif|webp|png|jpg|jpeg|svg|glb|ktx2)$/);

export const rightsRecordSchema = z.object({
  id,
  basis: z.enum(["owner-created", "public-domain", "open-license", "licensed", "restricted"]),
  source: z.string().min(1),
  jurisdiction: z.string().min(1),
  attribution: z.string(),
  allowedActions: z.array(z.enum(["metadata", "display", "read", "download"])),
  evidencePath: z.string().min(1),
  reviewedAt: z.iso.date(),
  verificationStatus: z.enum(["pending", "verified"]),
});

export const bookAssetSchema = z.object({
  id,
  kind: z.enum(["cover", "model", "texture", "preview", "audio"]),
  path: safeAssetPath,
  alt: z.string(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  bytes: z.number().int().nonnegative(),
  rightsId: id,
});

export const bookSchema = z.object({
  id,
  slug,
  title: z.string().min(1),
  subtitle: z.string().optional(),
  authors: z.array(z.string().min(1)).min(1),
  description: z.string().min(1),
  language: z.string().min(2),
  publishedYear: z.number().int().optional(),
  publisher: z.string().optional(),
  isbn: z.string().optional(),
  categoryId: id,
  tagIds: z.array(id),
  collectionIds: z.array(id),
  coverAssetId: id,
  readerContentId: id.nullable(),
  featured: z.boolean(),
  sortOrder: z.number().int(),
  rightsId: id,
  status: z.enum(["draft", "published"]),
});

export const collectionSchema = z.object({
  id,
  slug,
  title: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.number().int(),
});

export const readerContentSchema = z.object({
  id,
  bookId: id,
  format: z.literal("html-markdown"),
  extent: z.enum(["preview", "complete"]),
  chapters: z.array(z.object({ id, title: z.string().min(1), order: z.number().int(), sourcePath: z.string().regex(/^content\/chapters\/[a-z0-9/_-]+\.md$/) })).min(1),
  rightsId: id,
});

export type Book = z.infer<typeof bookSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type BookAsset = z.infer<typeof bookAssetSchema>;
export type ReaderContent = z.infer<typeof readerContentSchema>;
export type RightsRecord = z.infer<typeof rightsRecordSchema>;
