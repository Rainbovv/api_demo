import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { ConversionRequest } from './conversion.type';
import { Public } from '../auth/auth.constant';
import { ZodPipe } from '../zod/zod.pipe';
import { ConvertRequestSchema } from '../zod/zod.schema';

@Controller('conversion')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Public()
  @UsePipes(new ZodPipe(ConvertRequestSchema))
  @Post()
  convert(@Body() request: ConversionRequest): Promise<number> {
    return this.conversionService.convert(
      request.amount,
      request.from,
      request.to,
    );
  }
}
