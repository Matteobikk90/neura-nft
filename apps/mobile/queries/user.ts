import { urlEndpoints } from "@/constants/urls";
import type { UserPayloadType, UserResponseType } from "@/types/user";
import { axiosGet, axiosPost } from "@/utils/api";

export async function getUser(address: string) {
  return axiosGet<UserResponseType>(urlEndpoints.user, {
    params: { address },
  });
}

export async function upsertUser(user: UserPayloadType) {
  return axiosPost(urlEndpoints.user, user);
}
