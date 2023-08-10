import { Module } from "@nestjs/common";
import { CacheCoreModule } from "./cache-core.module";

@Module({
  imports: [CacheCoreModule.register({ global: true })],
  exports: [CacheCoreModule],
})
export class CacheModule {}
