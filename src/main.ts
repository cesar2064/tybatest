import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './handle-envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config;
  await app.listen(3000);
}
bootstrap();
