import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as cookieParser from 'cookie-parser';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000", // ❗ Das Frontend erlauben
    credentials: true,               // ❗ Cookies erlauben
  });
  app.use(cookieParser());

  await app.listen(3001);
}
bootstrap();
