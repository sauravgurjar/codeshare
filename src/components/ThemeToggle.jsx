import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import Button from "./ui/Button";

export default function ThemeToggle({ variant = "secondary" }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant={variant} size="sm" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}

