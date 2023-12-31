import { Module } from "@nestjs/common";
import { IUserProvider } from "../contracts/auth/user-provider";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  // controllers: [UserController],
  providers: [
    {
      provide: IUserProvider,
      useClass: UserService,
    },
  ],
  exports: [IUserProvider],
})
export class UserModule {}
