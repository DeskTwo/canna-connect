import * as dotenv from 'dotenv';
dotenv.config();
console.log("Geladener JWT_SECRET:", process.env.JWT_SECRET);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS aktivieren
  app.enableCors({
    origin: 'http://localhost:3000', // Erlaubt Anfragen vom Frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3001);
}
bootstrap();

