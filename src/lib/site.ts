export const siteOrigin = process.env.KITABS_SITE_ORIGIN ?? "http://localhost:3000";
export const basePath = process.env.KITABS_BASE_PATH ?? "";

export function publicAsset(path: string): string {
  if (!path.startsWith("/assets/")) throw new Error("Invalid public asset path");
  return `${basePath}${path}`;
}

export function canonicalPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(`${basePath}${normalized}`, siteOrigin).toString();
}
