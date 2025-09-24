import { ENV } from "@/config/env";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});
