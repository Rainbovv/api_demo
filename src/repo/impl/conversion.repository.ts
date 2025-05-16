import { Inject, Injectable } from '@nestjs/common';
import { AbstractConversionRepository } from '../../conversion/conversion.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { parseString } from '@fast-csv/parse';
import { CurrencyAbr, RateRow } from '../../conversion/conversion.type';
import { getFormatedDateString } from 'src/common/utility/time.utility';

@Injectable()
export class ConversionRepository implements AbstractConversionRepository {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  private readonly RATES_URL: string =
    'https://www.bnm.md/ro/export-official-exchange-rates?date=';

  public async getRates(date: Date = new Date()): Promise<Map<string, number>> {
    const formatedDate = getFormatedDateString(date);

    let rates = await this.cacheManager.get<Map<string, number>>(formatedDate);

    if (!rates) {
      rates = await this.fetchRatesMapByDate(formatedDate);
      await this.cacheManager.set(formatedDate, rates);
    }

    return rates;
  }

  private async fetchRatesMapByDate(
    formatedDate: string,
  ): Promise<Map<string, number>> {
    return new Map(
      await firstValueFrom(
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
              .map((row: RateRow) => [
                row.abr,
                Number(row.rate.replace(',', '.')),
              ])
              .toArray(),
          ),
        ),
      ),
    );
  }
}
