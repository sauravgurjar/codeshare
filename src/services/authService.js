import { mockDb, seedMockDb } from "../utils/mockDb";

seedMockDb();

function sleep(ms = 450) {
  return new Promise((r) => setTimeout(r, ms));
}

function makeToken(userId) {
  return `mock_${userId}_${Math.random().toString(16).slice(2)}`;
}

export const authService = {
  async login({ email, password }) {
    await sleep();
    const users = mockDb.readUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }
    const token = makeToken(user.id);
    mockDb.writeAuth({ token, userId: user.id });
    localStorage.setItem("codeshare.token", token);
    return { token, user: { ...user, password: undefined } };
  },

  async register({ name, email, password }) {
    await sleep();
    const users = mockDb.readUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      const err = new Error("Email already registered");
      err.status = 409;
      throw err;
    }
    const user = {
      id: `user_${Math.random().toString(16).slice(2)}`,
      name,
      email,
      password,
      avatarUrl: "",
      createdAt: new Date().toISOString(),
    };
    mockDb.writeUsers([user, ...users]);
    const token = makeToken(user.id);
    mockDb.writeAuth({ token, userId: user.id });
    localStorage.setItem("codeshare.token", token);
    return { token, user: { ...user, password: undefined } };
  },

  async forgotPassword({ email }) {
    await sleep(600);
    const users = mockDb.readUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      const err = new Error("No account found for this email");
      err.status = 404;
      throw err;
    }
    return { ok: true };
  },

  async me() {
    await sleep(200);
    const { token, userId } = mockDb.readAuth();
    if (!token || !userId) return { token: "", user: null };
    const users = mockDb.readUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return { token: "", user: null };
    return { token, user: { ...user, password: undefined } };
  },

  async logout() {
    await sleep(120);
    mockDb.writeAuth({ token: "", userId: "" });
    localStorage.removeItem("codeshare.token");
    return { ok: true };
  },
};

