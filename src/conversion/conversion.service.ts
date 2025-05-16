import { AbstractConversionRepository } from './conversion.repository';
import { CurrencyAbr } from './conversion.type';
import { Injectable } from '@nestjs/common';
import { NoSuchElementException } from '../common/exception/exception.type';

@Injectable()
export class ConversionService {
  constructor(
    private readonly conversionRepository: AbstractConversionRepository,
  ) {}

  public async convert(
    amount: number,
    fromAbr: CurrencyAbr,
    toAbr: CurrencyAbr,
    date: Date = new Date(),
  ): Promise<number> {
    const rates = await this.conversionRepository.getRates(date);
    const fromRate = rates.get(fromAbr);
    const toRate = rates.get(toAbr);

    if (fromAbr !== CurrencyAbr.MDL) {
      if (!fromRate)
        throw new NoSuchElementException(
          `No ${fromAbr} rates available for ${date.toDateString()}`,
        );
      amount *= fromRate;
    }
    if (toAbr !== CurrencyAbr.MDL && toRate) {
      if (!fromRate)
        throw new NoSuchElementException(
          `No ${toAbr} rates available for ${date.toDateString()}`,
        );
      amount /= toRate;
    }

    return amount;
  }
}
