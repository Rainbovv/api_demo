import { AbstractConversionRepository } from './conversion.repository';
import { CurrencyAbr } from './conversion.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversionService {
  constructor(
    private readonly conversionRepository: AbstractConversionRepository,
  ) {}

  public convert(
    amount: number,
    fromAbr: string,
    toAbr: string,
  ): Promise<number> {
    const convertFunction = this.getConvertFunction(fromAbr);
    return convertFunction(amount, toAbr);
  }

  private getConvertFunction(
    currencyAbr: string,
  ): (amount: number, currency: string) => Promise<number> {
    switch (CurrencyAbr[currencyAbr]) {
      case CurrencyAbr.EUR:
        return this.covertFromEur;
      case CurrencyAbr.MDL:
        return this.covertFromMdl;
      case CurrencyAbr.USD:
        return this.covertFromUsd;
      case CurrencyAbr.GBP:
        return this.covertFromGbp;
      default:
        throw new Error('No such currency');
    }
  }

  private covertFromMdl = async (
    amount: number,
    currency: string,
  ): Promise<number> => {
    const currencyAbr = CurrencyAbr[currency];
    if (currencyAbr === CurrencyAbr.MDL) return amount;

    const rate = await this.conversionRepository.getRate(currencyAbr);
    return amount / rate;
  };

  private covertFromEur = async (
    amount: number,
    currency: string,
  ): Promise<number> => {
    const fromRate = await this.conversionRepository.getRate(CurrencyAbr.EUR);

    return this.covertFromMdl(amount * fromRate, currency);
  };

  private covertFromUsd = async (
    amount: number,
    currency: string,
  ): Promise<number> => {
    const fromRate = await this.conversionRepository.getRate(CurrencyAbr.USD);

    return this.covertFromMdl(amount * fromRate, currency);
  };

  private covertFromGbp = async (
    amount: number,
    currency: string,
  ): Promise<number> => {
    const fromRate = await this.conversionRepository.getRate(CurrencyAbr.GBP);

    return this.covertFromMdl(amount * fromRate, currency);
  };
}
