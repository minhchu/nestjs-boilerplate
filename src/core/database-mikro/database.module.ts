import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Config } from "../config";

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: async (config: Config) => {
        return {
          autoLoadEntities: true,
          dbName: "storage/nestjs.sqlite",
          type: "sqlite",
        };
      },
      inject: ["config"],
    }),
  ],
})
export class DatabaseModule {}
