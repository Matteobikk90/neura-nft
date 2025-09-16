import prisma from "@/config/prisma";

export async function findUserByAddress(address: string) {
  return prisma.user.findUnique({
    where: { address: address.toLowerCase() },
  });
}

export async function upsertUser(data: {
  address: string;
  chainId: string;
  provider?: string | null;
  icon?: string | null;
  url?: string | null;
}) {
  const now = Math.floor(Date.now() / 1000);

  return prisma.user.upsert({
    where: { address: data.address.toLowerCase() },
    update: {
      chainId: data.chainId,
      provider: data.provider,
      icon: data.icon,
      url: data.url,
      lastLoginAt: now,
    },
    create: {
      address: data.address.toLowerCase(),
      chainId: data.chainId,
      provider: data.provider,
      icon: data.icon,
      url: data.url,
      createdAt: now,
      lastLoginAt: now,
    },
  });
}
