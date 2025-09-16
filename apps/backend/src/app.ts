import { globalErrorHandler } from "@/middleware/error";
import userRoutes from "@/routes/user";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://10.38.222.233:8081"],
  }),
);
app.use(express.json());

app.use("/api/user", userRoutes);

app.use(globalErrorHandler);

export default app;
