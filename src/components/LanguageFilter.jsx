import Select from "./ui/Select";
import { LANGUAGES } from "../utils/constants";

export default function LanguageFilter({ value, onChange }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={[
        { value: "all", label: "All languages" },
        ...LANGUAGES.map((l) => ({ value: l.id, label: l.label })),
      ]}
    />
  );
}

