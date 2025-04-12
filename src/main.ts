import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

const LOGGER = new ConsoleLogger({
  prefix: 'Api-Demo-App',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LOGGER,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => LOGGER.error(error));
