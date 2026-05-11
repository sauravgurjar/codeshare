import { LANGUAGES, VISIBILITY } from "./constants";

const KEYS = {
  users: "codeshare.users",
  auth: "codeshare.auth",
  snippets: "codeshare.snippets",
  seeded: "codeshare.seeded",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function uid(prefix = "snip") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function seedMockDb() {
  const seeded = readJSON(KEYS.seeded, false);
  if (seeded) return;

  const demoUser = {
    id: "user_demo",
    name: "Demo Developer",
    email: "demo@codeshare.dev",
    password: "demo1234",
    avatarUrl: "",
    createdAt: new Date().toISOString(),
  };

  const exampleCode = `// Welcome to CodeShare ✨
export function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));`;

  const now = Date.now();
  const snippets = [
    {
      id: uid("snip"),
      ownerId: demoUser.id,
      title: "Hello World (JS)",
      language: "javascript",
      code: exampleCode,
      visibility: VISIBILITY.PUBLIC,
      tags: ["starter"],
      createdAt: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: uid("snip"),
      ownerId: demoUser.id,
      title: "Quick Sort (Python)",
      language: "python",
      code: `def qsort(xs):\n    if len(xs) <= 1:\n        return xs\n    pivot = xs[len(xs)//2]\n    left = [x for x in xs if x < pivot]\n    mid = [x for x in xs if x == pivot]\n    right = [x for x in xs if x > pivot]\n    return qsort(left) + mid + qsort(right)\n\nprint(qsort([3, 1, 4, 1, 5, 9]))\n`,
      visibility: VISIBILITY.PUBLIC,
      tags: ["algorithms"],
      createdAt: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 60 * 23).toISOString(),
    },
    {
      id: uid("snip"),
      ownerId: demoUser.id,
      title: "Private Notes",
      language: "markdown",
      code: `# Private snippet\n\nOnly visible to you.\n\n- TODO: add backend\n- TODO: add collaboration`,
      visibility: VISIBILITY.PRIVATE,
      tags: ["notes"],
      createdAt: new Date(now - 1000 * 60 * 15).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 10).toISOString(),
    },
  ];

  writeJSON(KEYS.users, [demoUser]);
  writeJSON(KEYS.snippets, snippets);
  writeJSON(KEYS.auth, { token: "", userId: "" });
  writeJSON(KEYS.seeded, true);
}

export const mockDb = {
  uid,
  readUsers() {
    return readJSON(KEYS.users, []);
  },
  writeUsers(users) {
    writeJSON(KEYS.users, users);
  },
  readAuth() {
    return readJSON(KEYS.auth, { token: "", userId: "" });
  },
  writeAuth(auth) {
    writeJSON(KEYS.auth, auth);
  },
  readSnippets() {
    return readJSON(KEYS.snippets, []);
  },
  writeSnippets(snippets) {
    writeJSON(KEYS.snippets, snippets);
  },
  findLanguageLabel(languageId) {
    return LANGUAGES.find((l) => l.id === languageId)?.label ?? languageId;
  },
};

