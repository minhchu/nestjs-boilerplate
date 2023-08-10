import { ConfigService } from "@nestjs/config";

export { ConfigModule } from "./config.module";

export type Config = ConfigService;
