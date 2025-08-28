export type CurrencyCode = string;

export interface CurrencyMeta {
  code: CurrencyCode;
  name: string;
  symbol?: string;
}

export interface ConversionRequest {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
  date?: string;
}

export interface ConversionResult {
  request: ConversionRequest;
  rate: number; 
  result: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

