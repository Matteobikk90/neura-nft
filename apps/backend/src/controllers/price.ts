import { getEthPriceChange } from "@/services/price";
import { Request, Response } from "express";

export const priceHandler = async (req: Request, res: Response) => {
  const result = await getEthPriceChange();
  res.json(result);
};
