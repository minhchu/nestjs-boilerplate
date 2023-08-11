import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guards";

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Req() req: Request) {
    return this.auth.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get("/auth/protected")
  async protected(@Req() req: Request) {
    return req.user;
  }
}
