export abstract class AbstractConversionRepository {
  /**
   * Retrieves exchange rates for a given date.
   *
   * @param {Date} [date=new Date()] - The date for which the exchange rates are needed. Defaults to the current date.
   * @returns {Promise<Map<string, number>>} - A map of exchange rates with currency codes as keys and rate values.
   *
   * The function first checks the cache for existing exchange rates using the formatted date.
   * If the rates are not available in the cache, they are fetched and stored for future use.
   */
  abstract getRates(date?: Date): Promise<Map<string, number>>;
}
