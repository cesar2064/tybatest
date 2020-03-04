import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './handle-envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_ENV_CONSTANTS } from './app.constants';
import helmet = require('helmet');
import { TransformResponseInterceptor } from './helpers/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const logger = new Logger('APP-MAIN');
  app.setGlobalPrefix(config.get(APP_ENV_CONSTANTS.API_PREFIX));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.use(helmet());
  const port = config.get(APP_ENV_CONSTANTS.API_PORT);
  await app.listen(port, () => logger.log(`App started in port: ${port}`));
}
bootstrap();
