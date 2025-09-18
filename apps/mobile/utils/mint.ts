// import { CONTRACT_ADDRESS, NFT_ABI } from "@/constants/contract";
// // your WalletConnect/AppKit wrapper
// import { ethers } from "ethers";
// import Toast from "react-native-toast-message";

// async function mintNFT(metadataUri: string, provider: string, address: string) {
//   const signer = provider.getSigner();
//   const nft = new ethers.Contract(CONTRACT_ADDRESS, NFT_ABI, signer);

//   const tx = await nft.mintNFT(address, metadataUri);

//   Toast.show({ type: "info", text1: "Minting...", text2: tx.hash });

//   const receipt = await tx.wait();

//   Toast.show({
//     type: "success",
//     text1: "NFT Minted! 🎉",
//     text2: `Tx confirmed: ${receipt.transactionHash}`,
//   });

//   return receipt.transactionHash;
// }
