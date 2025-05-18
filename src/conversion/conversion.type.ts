export interface ConversionRequest {
  amount: number;
  from: string;
  to: string;
  date: Date;
}

export interface ConversionResponse extends ConversionRequest {
  convertedAmount: number;
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

export class RateMap {
  EUR: number;
  USD: number;
  GBP: number;

  constructor(rates: RateRow[]) {
    rates.forEach((row: RateRow) => {
      this[row.abr] = row.rate.replace(',', '.');
    });
  }
}
