import NFT_ABI from "@/abi/NFT.json";
import { ENV } from "@/config/env";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(ENV.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(ENV.SEPOLIA_PRIVATE_KEY, provider);

export const nftContract = new ethers.Contract(
  ENV.NFT_CONTRACT_ADDRESS,
  NFT_ABI.abi,
  wallet,
);
