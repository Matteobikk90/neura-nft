export const tabs = [
  {
    name: "index",
    title: "Home",
    icon: "home",
    isProtected: false,
  },
  {
    name: "nfts",
    title: "NFTs",
    icon: "grid",
    isProtected: true,
  },
  {
    name: "wallet",
    title: "Wallet",
    icon: "wallet",
    isProtected: false,
  },
] as const;
