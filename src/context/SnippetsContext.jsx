import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { snippetService } from "../services/snippetService";

const SnippetsContext = createContext(null);

export function SnippetsProvider({ children }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async ({ ownerId } = {}) => {
    setLoading(true);
    setError("");
    try {
      const items = await snippetService.list({ ownerId });
      setSnippets(items);
    } catch (e) {
      setError(e?.message || "Failed to load snippets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createSnippet = useCallback(async (payload) => {
    const snip = await snippetService.create(payload);
    setSnippets((prev) => [snip, ...prev]);
    toast.success("Snippet created");
    return snip;
  }, []);

  const updateSnippet = useCallback(async (id, patch) => {
    const snip = await snippetService.update(id, patch);
    setSnippets((prev) => prev.map((s) => (s.id === id ? snip : s)));
    toast.success("Snippet updated");
    return snip;
  }, []);

  const deleteSnippet = useCallback(async (id) => {
    await snippetService.remove(id);
    setSnippets((prev) => prev.filter((s) => s.id !== id));
    toast("Snippet deleted");
    return { ok: true };
  }, []);

  const search = useCallback(async (params) => {
    setLoading(true);
    setError("");
    try {
      const items = await snippetService.search(params);
      setSnippets(items);
    } catch (e) {
      setError(e?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      snippets,
      loading,
      error,
      load,
      search,
      createSnippet,
      updateSnippet,
      deleteSnippet,
    }),
    [snippets, loading, error, load, search, createSnippet, updateSnippet, deleteSnippet],
  );

  return <SnippetsContext.Provider value={value}>{children}</SnippetsContext.Provider>;
}

export default SnippetsContext;

