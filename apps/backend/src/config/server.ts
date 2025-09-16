import app from "@/app";
import { createServer } from "http";

export const httpServer = createServer(app);
