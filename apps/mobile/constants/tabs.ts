export const tabs = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
    isProtected: false,
  },
  {
    name: "two",
    title: "More",
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
