import { CurrencyAbr } from './conversion.type';

export abstract class AbstractConversionRepository {
  /**
   * Retrieves the exchange rate for a given currency abbreviation.
   * If the rate is not found in the cache, it refreshes the cache and retries.
   *
   * @param {CurrencyAbr} currencyAbr - The currency abbreviation enum.
   * @returns {Promise<number>} A promise that resolves to the exchange rate as a number.
   */
  abstract getRate(currencyAbr: CurrencyAbr): Promise<number>;
}
