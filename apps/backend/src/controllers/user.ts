import * as userService from "@/services/user";
import { Request, Response } from "express";

export async function getUser(_req: Request, res: Response) {
  const { address } = res.locals.query;
  const user = await userService.findUserByAddress(address);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

export async function upsertUser(req: Request, res: Response) {
  const { address, chainId, provider, icon, url } = req.body;
  if (!address || !chainId) {
    return res
      .status(400)
      .json({ message: "Address and chainId are required" });
  }

  const user = await userService.upsertUser({
    address,
    chainId,
    provider,
    icon,
    url,
  });

  res.json(user);
}
