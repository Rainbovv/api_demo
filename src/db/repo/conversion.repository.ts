import { Inject, Injectable } from '@nestjs/common';
import { AbstractConversionRepository } from '../../conversion/conversion.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { parseString } from '@fast-csv/parse';
import { CurrencyAbr, RateRow } from '../../conversion/conversion.type';

@Injectable()
export class ConversionRepository implements AbstractConversionRepository {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  public async getRate(currencyAbr: CurrencyAbr): Promise<number> {
    let rate = await this.cacheManager.get(currencyAbr);

    if (!rate) {
      await this.refreshRateCache();
      rate = await this.cacheManager.get(currencyAbr);
    }

    return Number(rate);
  }

  private async refreshRateCache(): Promise<void> {
    const data = await firstValueFrom(
      this.httpService
        .get(
          'https://www.bnm.md/ro/export-official-exchange-rates?date=' +
            this.getFormatedDateString(new Date()),
        )
        .pipe(map((res) => res.data)),
    )
      .then((s: string) => s.replace(/^([^\n]*\n){3}|(\n[^\n]*){5}$/g, ''))
      .then((s) =>
        parseString<RateRow, RateRow>(s, {
          headers: [undefined, undefined, 'abr', undefined, 'rate'],
          delimiter: ';',
        }).filter(
          (row: RateRow) =>
            row.abr === 'EUR' || row.abr === 'USD' || row.abr === 'GBP',
        ),
      );

    await data.forEach((row: RateRow) => {
      this.cacheManager.set(
        row.abr,
        row.rate.replace(',', '.'),
        this.getMillisecondsUntilNextDay(),
      );
    });
  }

  /**
   * Formats a given date as a string in the `dd.mm.yyyy` format.
   *
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date string in `dd.mm.yyyy` format.
   *
   * @example
   * const date = new Date(2025, 4, 14); // May 14, 2025
   * console.log(getFormattedDateString(date)); // "14.05.2025"
   */
  private getFormatedDateString(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit format
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  /**
   * Calculates the number of milliseconds remaining until the next day (midnight).
   *
   * @returns {number} The number of milliseconds until the next midnight.
   *
   * @example
   * console.log(getMillisecondsUntilNextDay()); // Example output: 45231000 (milliseconds)
   */
  private getMillisecondsUntilNextDay(): number {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1); // Move to the next day
    nextDay.setHours(0, 0, 0, 0); // Set time to midnight

    return nextDay.getTime() - now.getTime();
  }
}
