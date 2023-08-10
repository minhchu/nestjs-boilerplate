import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);

  app.enableVersioning({ type: VersioningType.URI });

  app.useStaticAssets(join(__dirname, "..", "public"));

  app.setBaseViewsDir(join(__dirname, "..", "..", "src", "views"));

  app.setViewEngine("hbs");

  await app.listen(config.get("app.port"));
}

bootstrap();
