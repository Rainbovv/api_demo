import { Injectable } from '@nestjs/common';
import { CurrencyAbr, RateMap, RateRow } from './conversion.type';
import { CacheService } from 'src/cache/cache.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { parseString } from '@fast-csv/parse';
import { NoSuchElementException } from 'src/common/exception/exception.type';
import { getFormatedDateString } from '../common/utility/time.utility';

@Injectable()
export class ConversionService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly httpService: HttpService,
  ) {}

  private readonly RATES_URL: string =
    'https://www.bnm.md/ro/export-official-exchange-rates?date=';

  public async convert(
    amount: number,
    fromAbr: CurrencyAbr,
    toAbr: CurrencyAbr,
    date: Date = new Date(),
  ): Promise<number> {
    return this.getRates(date).then((rates: RateMap) => {
      let result = amount * this.getRate(fromAbr, date, rates);
      result /= this.getRate(toAbr, date, rates);

      return result;
    });
  }

  private getRate(currencyAbr: CurrencyAbr, date: Date, rateMap: RateMap) {
    if (currencyAbr === CurrencyAbr.MDL) return 1;

    const rate = rateMap[currencyAbr];
    if (!rate)
      throw new NoSuchElementException(
        `No ${currencyAbr} rates available for ${date.toDateString()}`,
      );

    return rate;
  }

  public async getRates(date: Date = new Date()): Promise<RateMap> {
    const formatedDate = getFormatedDateString(date);
    let rates = await this.cacheService.get<RateMap>(formatedDate);

    if (!rates) {
      rates = new RateMap(await this.fetchRatesMapByDate(formatedDate));
      await this.cacheService.set<RateMap>(formatedDate, rates);
    }

    return rates;
  }

  private async fetchRatesMapByDate(formatedDate: string): Promise<RateRow[]> {
    return firstValueFrom(
      this.httpService.get(this.RATES_URL + formatedDate).pipe(
        map(async (res: { data: string }) =>
          parseString<RateRow, RateRow>(
            res.data.replace(/^([^\n]*\n){3}|(\n[^\n]*){5}$/g, ''),
            {
              headers: [undefined, undefined, 'abr', undefined, 'rate'],
              delimiter: ';',
            },
          )
            .filter((row: RateRow) => CurrencyAbr[row.abr] !== undefined)
            .toArray(),
        ),
      ),
    );
  }
}
