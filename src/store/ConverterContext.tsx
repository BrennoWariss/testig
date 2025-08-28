import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ConversionRequest, ConversionResult, CurrencyMeta } from "@/models/currency";
import { conversionController } from "@/controllers/conversionController";
import { isPositiveAmount, isValidDateOrEmpty } from "@/utils/validation";

type FormState = {
  from: string;
  to: string;
  amount: string;
  date?: string;
};

type ConverterState = {
  currencies: CurrencyMeta[];
  loadingCurrencies: boolean;
  form: FormState;
  submitting: boolean;
  error?: string;
  result?: ConversionResult;
};

type ConverterActions = {
  setForm: (p: Partial<FormState>) => void;
  swap: () => void;
  submit: () => Promise<void>;
  resetResult: () => void;
  reloadCurrencies: () => Promise<void>;
};

const ConverterContext = createContext<(ConverterState & ConverterActions) | undefined>(undefined);

export function ConverterProvider({ children }: { children: React.ReactNode }) {
  const [currencies, setCurrencies] = useState<CurrencyMeta[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ConversionResult | undefined>(undefined);

  const [form, setFormState] = useState<FormState>({ from: "USD", to: "BRL", amount: "" });

  const setForm = useCallback((p: Partial<FormState>) => {
    setFormState((s) => ({ ...s, ...p }));
  }, []);

  const swap = useCallback(() => {
    setFormState((s) => ({ ...s, from: s.to, to: s.from }));
  }, []);

  const reloadCurrencies = useCallback(async () => {
    setLoadingCurrencies(true);
    setError(undefined);
    try {
      const cs = await conversionController.loadCurrencies();
      setCurrencies(cs);
      const codes = new Set(cs.map((c) => c.code));
      setFormState((s) => ({
        ...s,
        from: codes.has(s.from) ? s.from : cs[0]?.code ?? "USD",
        to: codes.has(s.to) ? s.to : cs[1]?.code ?? "BRL",
      }));
    } catch (e: any) {
      setError(e?.message ?? "Error loading currencies");
    } finally {
      setLoadingCurrencies(false);
    }
  }, []);

  useEffect(() => {
    reloadCurrencies();
  }, [reloadCurrencies]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setError(undefined);
    setResult(undefined);
    try {
      if (!form.from || !form.to) throw new Error("Select currencies");
      if (!isPositiveAmount(form.amount)) throw new Error("Invalid amount (up to 2 decimal places)");
      if (!isValidDateOrEmpty(form.date)) throw new Error("Invalid date (cannot be in the future)");
      const req: ConversionRequest = {
        from: form.from,
        to: form.to,
        amount: parseFloat(form.amount),
        date: form.date || undefined,
      };
      const res = await conversionController.convert(req);
      setResult(res);
    } catch (e: any) {
      setError(e?.message ?? "Conversion failed");
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  const resetResult = useCallback(() => setResult(undefined), []);

  const value = useMemo(
    () => ({
      currencies,
      loadingCurrencies,
      form,
      submitting,
      error,
      result,
      setForm,
      swap,
      submit,
      resetResult,
      reloadCurrencies,
    }),
    [currencies, loadingCurrencies, form, submitting, error, result, setForm, swap, submit, resetResult, reloadCurrencies]
  );

  return <ConverterContext.Provider value={value}>{children}</ConverterContext.Provider>;
}

export function useConverter() {
  const ctx = useContext(ConverterContext);
  if (!ctx) throw new Error("useConverter must be used within ConverterProvider");
  return ctx;
}

