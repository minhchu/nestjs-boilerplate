import { registerAs } from "@nestjs/config";

export default registerAs("app", () => {
  return {
    port: process.env.APP_PORT || 3000,
  };
});
