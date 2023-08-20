import { IUserProvider } from "@/core/contracts/auth/user-provider";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  providers: [
    {
      provide: IUserProvider,
      useClass: UserService,
    },
  ],
  exports: [IUserProvider],
})
export class UserModule {}
