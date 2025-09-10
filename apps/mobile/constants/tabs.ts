export const tabs = [
  {
    name: "index",
    title: "Home",
    icon: "home",
    isProtected: false,
  },
  {
    name: "tokens",
    title: "Tokens",
    icon: "bar-chart",
    isProtected: true,
  },
  {
    name: "nfts",
    title: "NFTs",
    icon: "grid",
    isProtected: true,
  },
  // {
  //   name: "wallet",
  //   title: "Wallet",
  //   icon: "wallet",
  //   isProtected: false,
  // },
  {
    name: "profile",
    title: "Profile",
    icon: "person",
    isProtected: false,
  },
] as const;
