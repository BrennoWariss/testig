import { useMemo } from "react";
import { useConverter } from "@/store/ConverterContext";

type Props = {
  label: string;
  value: string;
  onChange: (code: string) => void;
  name?: string;
};

export function CurrencySelect({ label, value, onChange, name }: Props) {
  const { currencies, loadingCurrencies } = useConverter();
  const options = useMemo(() => currencies.sort((a, b) => a.code.localeCompare(b.code)), [currencies]);

  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} disabled={loadingCurrencies} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} — {c.name}
          </option>
        ))}
      </select>
    </label>
  );
}

