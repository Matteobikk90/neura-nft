export type UserPayloadType = {
  address: string;
  chainId: string;
  provider?: string | null;
  icon?: string | null;
  url?: string | null;
};

export type UserResponseType = UserPayloadType & {
  _id: string;
  createdAt: number;
  lastLoginAt: number;
};
