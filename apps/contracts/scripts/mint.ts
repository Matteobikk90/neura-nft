import * as dotenv from "dotenv";
import hre from "hardhat";

dotenv.config();

async function main() {
  const connection = await hre.network.connect();
  const [owner] = await connection.ethers.getSigners();

  const metadataUri = process.env.METADATA_URI;
  const nftAddress = process.env.NFT_CONTRACT_ADDRESS!;

  if (!metadataUri) {
    throw new Error(
      "❌ Missing metadata URI. Usage:\n pnpm hardhat run scripts/mint.ts --network localhost -- ipfs://QmYourHash",
    );
  }

  const nft = await connection.ethers.getContractAt("NFT", nftAddress);

  console.log(
    `➡️ Minting NFT to ${owner.address} with metadata: ${metadataUri}`,
  );
  const tx = await nft.mintNFT(owner.address, metadataUri);
  await tx.wait();

  console.log("✅ Minted NFT to:", owner.address);
  console.log("🔗 Token metadata URI:", metadataUri);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
