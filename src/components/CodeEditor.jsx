import Editor from "@monaco-editor/react";
import { useTheme } from "../hooks/useTheme";

export default function CodeEditor({ language = "javascript", value, onChange, readOnly, height = "calc(100vh - 220px)" }) {
  const { theme } = useTheme();
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          readOnly: Boolean(readOnly),
          minimap: { enabled: false },
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
          fontSize: 14,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          wordWrap: "on",
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}

