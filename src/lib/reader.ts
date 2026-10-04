import { readFileSync } from "node:fs";
import { join } from "node:path";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export function renderSafeMarkdown(source: string): string {
  const blocks = source.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const line = block.trim();
    if (line.startsWith("## ")) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
    if (line.startsWith("# ")) return `<h2>${escapeHtml(line.slice(2))}</h2>`;
    return `<p>${escapeHtml(line).replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
}

export function loadChapter(path: string): string {
  if (!/^content\/chapters\/[a-z0-9/_-]+\.md$/.test(path)) throw new Error("Invalid chapter path");
  return renderSafeMarkdown(readFileSync(join(process.cwd(), path), "utf8"));
}
