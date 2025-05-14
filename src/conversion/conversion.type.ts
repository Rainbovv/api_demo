export interface ConversionRequest {
  amount: number;
  from: string;
  to: string;
}

export interface RateRow {
  abr: string;
  rate: string;
}

export enum CurrencyAbr {
  MDL = 'MDL',
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}
