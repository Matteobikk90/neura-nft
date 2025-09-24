import { ENV } from "@/config/env";
import { PINATA_GATEWAY } from "@/constants/urls";
import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: ENV.PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});
