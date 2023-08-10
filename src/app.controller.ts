import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("welcome.hbs")
  home() {
    return { message: "NestJs boilerplate" };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
