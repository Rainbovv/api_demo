import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { GlobalFilter } from './common/filter/global.filter';

const LOGGER = new ConsoleLogger({
  prefix: 'Api-Demo-App',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LOGGER,
  });
  app.useGlobalFilters(new GlobalFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => LOGGER.error(error));
