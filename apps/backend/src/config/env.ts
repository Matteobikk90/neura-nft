import "dotenv/config";

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  DATABASE_RENDER_URL: process.env.DATABASE_RENDER_URL!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
  PORT: process.env.PORT || "3000",
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY!,
  NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS!,
  SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL!,
  SEPOLIA_PRIVATE_KEY: process.env.SEPOLIA_PRIVATE_KEY!,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
