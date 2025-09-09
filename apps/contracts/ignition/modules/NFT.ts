import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTModule = buildModule("NFTModule", (m) => {
  const myNFT = m.contract("NFT");
  return { myNFT };
});

export default NFTModule;
