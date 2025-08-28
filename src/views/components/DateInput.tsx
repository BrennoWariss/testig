import { isValidDateOrEmpty } from "@/utils/validation";

type Props = {
  label?: string;
  value?: string;
  onChange: (v?: string) => void;
};

export function DateInput({ label = "Date (optional)", value, onChange }: Props) {
  const invalid = value ? !isValidDateOrEmpty(value) : false;
  return (
    <label className="field">
      <span>{label}</span>
      <input type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)} aria-invalid={invalid} />
      {invalid && <small className="error">Invalid date (cannot be in the future)</small>}
    </label>
  );
}

