import { registerAs } from "@nestjs/config";

export default registerAs("cache", () => {
  return {
    default: process.env.CACHE_DRIVER || "memory",
  };
});
