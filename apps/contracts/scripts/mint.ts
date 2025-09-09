import hre from "hardhat";

async function main() {
  // connect to local Hardhat node
  const connection = await hre.network.connect();

  // get signer(s)
  const [owner] = await connection.ethers.getSigners();

  // attach to deployed NFT contract
  const nftAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const nft = await connection.ethers.getContractAt("NFT", nftAddress);

  // mint
  const tx = await nft.mintNFT(owner.address, "ipfs://QmYourMetadataHash");
  await tx.wait();

  console.log("✅ Minted NFT to:", owner.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
