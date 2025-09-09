import { expect } from "chai";
import hre from "hardhat";
import { describe, it } from "mocha";

describe("NFT contract", function () {
  async function deployNFTFixture() {
    const connection = await hre.network.connect();
    const [owner, otherAccount] = await connection.ethers.getSigners();

    const NFT = await connection.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();

    return { nft, owner, otherAccount };
  }

  it("Should deploy with correct name and symbol", async () => {
    const { nft } = await deployNFTFixture();

    expect(await nft.name()).to.equal("NFT");
    expect(await nft.symbol()).to.equal("MNFT");
  });

  it("Owner can mint a new NFT", async () => {
    const { nft, owner } = await deployNFTFixture();

    const uri = "ipfs://QmTestUri";
    const tx = await nft.mintNFT(owner.address, uri);
    await tx.wait();

    const tokenUri = await nft.tokenURI(0);
    expect(tokenUri).to.equal(uri);
  });

  it("Non-owner cannot mint", async () => {
    const { nft, otherAccount } = await deployNFTFixture();

    await expect(
      nft.connect(otherAccount).mintNFT(otherAccount.address, "ipfs://QmFail"),
    ).to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount");
  });

  it("Should mint an NFT with IPFS metadata", async function () {
    const connection = await hre.network.connect();
    const [owner] = await connection.ethers.getSigners();

    // Deploy a fresh NFT contract
    const NFT = await connection.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();

    // CID of your JSON (replace with real one from Pinata)
    const metadataUri =
      "ipfs://bafkreihzh5tfd4jazxeko572apmyydkixtdrln6qrudmd4oyvfhhfkkgwe";

    // Mint the NFT
    const tx = await nft.mintNFT(owner.address, metadataUri);
    await tx.wait();

    // The new token should exist with tokenId 0
    const tokenUri = await nft.tokenURI(0);
    expect(tokenUri).to.equal(metadataUri);
  });
});
