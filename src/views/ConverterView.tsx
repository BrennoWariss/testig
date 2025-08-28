import { useConverter } from "@/store/ConverterContext";
import { CurrencySelect } from "@/views/components/CurrencySelect";
import { AmountInput } from "@/views/components/AmountInput";
import { DateInput } from "@/views/components/DateInput";
import { SwapButton } from "@/views/components/SwapButton";
import { ResultBox } from "@/views/components/ResultBox";
import { ErrorMessage } from "@/views/components/ErrorMessage";

export default function ConverterView() {
  const { form, setForm, swap, submit, submitting, result, error, loadingCurrencies } = useConverter();

  return (
    <main className="container">
      <h1>Currency Converter</h1>

      <form
        className="converter"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="row">
          <CurrencySelect label="From" value={form.from} onChange={(v) => setForm({ from: v })} name="from" />
          <SwapButton onClick={swap} />
          <CurrencySelect label="To" value={form.to} onChange={(v) => setForm({ to: v })} name="to" />
        </div>

        <div className="row">
          <AmountInput value={form.amount} onChange={(v) => setForm({ amount: v })} />
          <DateInput value={form.date} onChange={(v) => setForm({ date: v })} />
        </div>

        <div className="row">
          <button type="submit" disabled={submitting || loadingCurrencies}>
            {submitting ? "Converting..." : "Convert"}
          </button>
        </div>
      </form>

      <ErrorMessage message={error} />
      <ResultBox data={result} />
    </main>
  );
}

