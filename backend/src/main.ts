import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000", // ✅ Das Frontend erlauben
    credentials: true, // ✅ Cookies erlauben
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe()); // ✅ Validation aktivieren

  await app.listen(3001);

  console.log("📌 Registrierte Routen:");
  const server = app.getHttpAdapter().getInstance();
  server._router?.stack
    .filter((layer) => layer.route)
    .map((layer) =>
      console.log(`➡️  ${Object.keys(layer.route.methods).join(", ").toUpperCase()} ${layer.route.path}`)
    );
}

bootstrap();
