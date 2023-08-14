import { Module } from "@nestjs/common";
import { IUserProvider } from "@/core/contracts/auth/user-provider";
import { UserService } from "./user.service";

@Module({
  providers: [
    {
      provide: IUserProvider,
      useClass: UserService,
    },
  ],
  exports: [IUserProvider],
})
export class UserModule {}
