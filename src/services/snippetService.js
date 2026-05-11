import { mockDb, seedMockDb } from "../utils/mockDb";
import { VISIBILITY } from "../utils/constants";

seedMockDb();

function sleep(ms = 350) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

export const snippetService = {
  async list({ ownerId } = {}) {
    await sleep();
    const snippets = mockDb.readSnippets();
    return ownerId ? snippets.filter((s) => s.ownerId === ownerId) : snippets;
  },

  async getById(id) {
    await sleep(220);
    const snippets = mockDb.readSnippets();
    const snippet = snippets.find((s) => s.id === id);
    if (!snippet) {
      const err = new Error("Snippet not found");
      err.status = 404;
      throw err;
    }
    return snippet;
  },

  async create({ ownerId, title, language, code, visibility = VISIBILITY.PUBLIC, tags = [] }) {
    await sleep();
    const snippets = mockDb.readSnippets();
    const now = new Date().toISOString();
    const snippet = {
      id: mockDb.uid("snip"),
      ownerId,
      title: title?.trim() || "Untitled Snippet",
      language,
      code: code ?? "",
      visibility,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    mockDb.writeSnippets([snippet, ...snippets]);
    return snippet;
  },

  async update(id, patch) {
    await sleep();
    const snippets = mockDb.readSnippets();
    const idx = snippets.findIndex((s) => s.id === id);
    if (idx < 0) {
      const err = new Error("Snippet not found");
      err.status = 404;
      throw err;
    }
    const updated = {
      ...snippets[idx],
      ...patch,
      title: patch.title !== undefined ? patch.title.trim() : snippets[idx].title,
      updatedAt: new Date().toISOString(),
    };
    const next = [...snippets];
    next[idx] = updated;
    mockDb.writeSnippets(next);
    return updated;
  },

  async remove(id) {
    await sleep(250);
    const snippets = mockDb.readSnippets();
    const next = snippets.filter((s) => s.id !== id);
    mockDb.writeSnippets(next);
    return { ok: true };
  },

  async search({ ownerId, query = "", language = "all", visibility = "all" } = {}) {
    await sleep(220);
    const q = normalizeText(query);
    let items = mockDb.readSnippets();
    if (ownerId) items = items.filter((s) => s.ownerId === ownerId);

    if (language !== "all") items = items.filter((s) => s.language === language);
    if (visibility !== "all") items = items.filter((s) => s.visibility === visibility);

    if (!q) return items;
    return items.filter((s) => {
      const hay = normalizeText(`${s.title} ${s.language} ${(s.tags || []).join(" ")} ${s.code}`);
      return hay.includes(q);
    });
  },
};

