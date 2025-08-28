import { isPositiveAmount } from "@/utils/validation";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
};

export function AmountInput({ label = "Amount", value, onChange }: Props) {
  const invalid = value.length > 0 && !isPositiveAmount(value);
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="text"
        inputMode="decimal"
        placeholder="0.00"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
      />
      {invalid && <small className="error">Value must be positive and up to 2 decimal places</small>}
    </label>
  );
}

