import { getDb } from "@/config/mongo";

export async function findUserByAddress(address: string) {
  const db = getDb();
  return db.collection("users").findOne({ address: address.toLowerCase() });
}

export async function upsertUser(data: {
  address: string;
  chainId: string;
  provider?: string | null;
  icon?: string | null;
  url?: string | null;
}) {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);

  await db.collection("users").updateOne(
    { address: data.address.toLowerCase() },
    {
      $set: {
        ...data,
        address: data.address.toLowerCase(),
        lastLoginAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return db
    .collection("users")
    .findOne({ address: data.address.toLowerCase() });
}
