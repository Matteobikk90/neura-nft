import type { AlchemyNFT } from "@/types/nft-card";

export const formatDateTime = (minedAt: string | Date) =>
  new Date(minedAt).toLocaleString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    year: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export const textFiltered = (providerName: string) =>
  providerName.replace(/wallet/i, "").trim();

export function resolveNFTTitle(nft: AlchemyNFT): string {
  const rawTokenId = nft.id?.tokenId ?? "";
  const tokenId = rawTokenId ? parseInt(rawTokenId, 16) : null;

  const name = nft.metadata?.name?.trim() || nft.title?.trim();
  if (name) return name;

  const attributes = nft.metadata?.attributes;
  if (Array.isArray(attributes)) {
    const mainTraits = attributes
      .filter(
        (attr) =>
          typeof attr.value === "string" && typeof attr.trait_type === "string",
      )
      .slice(0, 2)
      .map((attr) => attr.value)
      .filter(Boolean);

    if (mainTraits.length > 0 && tokenId !== null) {
      return `${mainTraits.join(" · ")} · #${tokenId}`;
    } else if (mainTraits.length > 0) {
      return mainTraits.join(" · ");
    }
  }

  return tokenId !== null ? `#${tokenId}` : "Untitled";
}

export function isValidPrompt(prompt: string, minWords = 3): boolean {
  if (!prompt) return false;
  const words = prompt.trim().split(/\s+/);

  return words.length >= minWords;
}
