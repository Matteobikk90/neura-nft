export const proxyTarget = process.env.EXPO_PUBLIC_API_URL!;

export const urlEndpoints = {
  getPriceChange:
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
};
