import "dotenv/config";

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  DATABASE_NAME: process.env.DATABASE_NAME || "",
  PORT: process.env.PORT || "3000",
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY || "",
};
