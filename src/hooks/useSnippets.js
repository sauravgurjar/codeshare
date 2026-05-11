import { useContext } from "react";
import SnippetsContext from "../context/SnippetsContext.jsx";

export function useSnippets() {
  const ctx = useContext(SnippetsContext);
  if (!ctx) throw new Error("useSnippets must be used within SnippetsProvider");
  return ctx;
}

