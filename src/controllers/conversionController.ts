import { fetchCurrencies, fetchRate } from "@/services/currencyApi";
import type { ConversionRequest, ConversionResult, CurrencyMeta } from "@/models/currency";

export const conversionController = {
  async loadCurrencies(): Promise<CurrencyMeta[]> {
    return await fetchCurrencies();
  },

  async convert(req: ConversionRequest): Promise<ConversionResult> {
    const rate = await fetchRate({ base: req.from, quote: req.to, date: req.date });
    const result = req.amount * rate;
    return { request: req, rate, result };
  },
};

