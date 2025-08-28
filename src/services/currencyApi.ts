import type { CurrencyMeta } from "@/models/currency";

const BASE_URL = "https://api.currencyapi.com/v3";

function getApiKey() {
  const key = import.meta.env.VITE_CURRENCY_API_KEY as string | undefined;
  if (!key) throw new Error("Missing VITE_CURRENCY_API_KEY in environment");
  return key;
}

type LatestResponse = {
  data: Record<string, { code: string; value: number }>;
};

type CurrenciesResponse = {
  data: Record<string, { code: string; name: string; symbol?: string }>;
};

export async function fetchCurrencies(): Promise<CurrencyMeta[]> {
  const res = await fetch(`${BASE_URL}/currencies`, {
    headers: { apikey: getApiKey() },
  });
  if (!res.ok) throw new Error(`Failed to fetch currencies: ${res.status}`);
  const json = (await res.json()) as CurrenciesResponse;
  return Object.values(json.data).map((c) => ({ code: c.code, name: c.name, symbol: c.symbol }));
}

export async function fetchRate(params: {
  base: string;
  quote: string;
  date?: string; 
}): Promise<number> {
  const { base, quote, date } = params;
  const url = new URL(date ? `${BASE_URL}/historical` : `${BASE_URL}/latest`);
  url.searchParams.set("base_currency", base);
  url.searchParams.set("currencies", quote);
  if (date) url.searchParams.set("date", date);
  const res = await fetch(url.toString(), {
    headers: { apikey: getApiKey() },
  });
  if (!res.ok) throw new Error(`Failed to fetch rate: ${res.status}`);
  const json = (await res.json()) as LatestResponse;
  const item = json.data[quote];
  if (!item) throw new Error("Rate not available for selected pair");
  return item.value;
}
