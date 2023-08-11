import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: "user_service", useExisting: UserService },
  ],
  exports: [UserService, "user_service"],
})
export class UserModule {}
