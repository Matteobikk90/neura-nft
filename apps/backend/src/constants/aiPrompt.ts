export const NFT_METADATA_PROMPT = {
  system: {
    role: "system" as const,
    content:
      'You are an assistant that generates NFT metadata. Always respond in strict JSON format: { "title": string, "description": string }. The "title" must be short and catchy (max 5 words). The "description" must be a single, concise sentence (max 15 words).',
  },
  toMessages: (userPrompt: string) => [
    {
      role: "system" as const,
      content: NFT_METADATA_PROMPT.system.content,
    },
    {
      role: "user" as const,
      content: userPrompt,
    },
  ],
};
