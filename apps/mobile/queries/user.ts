import { urlEndpoints } from "@/constants/urls";
import type { UserPayloadType } from "@/types/user";
import { axiosGet, axiosPost } from "@/utils/api";

export async function getUser(address: string) {
  return axiosGet<UserPayloadType>(urlEndpoints.user, {
    params: { address },
  });
}

export async function upsertUser(user: UserPayloadType) {
  return axiosPost(urlEndpoints.user, user);
}
