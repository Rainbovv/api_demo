import { AbstractConversionRepository } from './conversion.repository';
import { CurrencyAbr } from './conversion.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversionService {
  constructor(
    private readonly conversionRepository: AbstractConversionRepository,
  ) {}

  public async convert(
    amount: number,
    fromAbr: CurrencyAbr,
    toAbr: CurrencyAbr,
  ): Promise<number> {
    if (fromAbr !== CurrencyAbr.MDL)
      amount *= await this.conversionRepository.getRate(fromAbr);
    if (toAbr !== CurrencyAbr.MDL)
      amount /= await this.conversionRepository.getRate(toAbr);

    return amount;
  }
}
