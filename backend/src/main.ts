import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment = process.env.NODE_ENV || 'development';
const envFilePath = environment === 'production' ? '.env.production' : '.env';

if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://mejoracv.fadetechs.com', // Cambia esto al origen que necesites permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
