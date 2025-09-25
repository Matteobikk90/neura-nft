import { globalErrorHandler } from "@/middleware/error";
import aiRoutes from "@/routes/ai";
import mintRoutes from "@/routes/mint";
import nftsRoutes from "@/routes/nfts";
import tokenRoutes from "@/routes/price";
import userRoutes from "@/routes/user";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: ["http://10.230.1.233:8081", "https://neura-nft.onrender.com"],
  }),
);

app.use("/api/mint", express.json({ limit: "10mb" }), mintRoutes);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/nfts", nftsRoutes);
app.use("/api/ai", aiRoutes);

app.use(globalErrorHandler);

export default app;
