import { endpoints } from "@/constants/urls";
import axios from "axios";

export async function getEthPriceChange() {
  const { data } = await axios.get(endpoints.getPrice);

  return { priceChange: data.ethereum.usd_24h_change };
}
