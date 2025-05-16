import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import {
  ConversionRequest,
  ConversionResponse,
  CurrencyAbr,
} from './conversion.type';
import { Public } from '../auth/auth.constant';
import { ZodPipe } from '../zod/zod.pipe';
import { ConvertRequestSchema } from '../zod/zod.schema';

@Controller('conversion')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Public()
  @UsePipes(new ZodPipe(ConvertRequestSchema))
  @Post()
  async convert(
    @Body() request: ConversionRequest,
  ): Promise<ConversionResponse> {
    const result = await this.conversionService.convert(
      request.amount,
      CurrencyAbr[request.from],
      CurrencyAbr[request.to],
      request.date,
    );
    return { ...request, convertedAmount: result };
  }
}
