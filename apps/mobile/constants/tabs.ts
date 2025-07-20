export const tabs = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
    isProtected: false,
  },
  {
    name: "nfts",
    title: "NFTs",
    icon: "grid-outline",
    isProtected: true,
  },
  {
    name: "wallet",
    title: "Wallet",
    icon: "wallet-outline",
    isProtected: false,
  },
] as const;
