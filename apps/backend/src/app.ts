import { globalErrorHandler } from "@/middleware/error";

import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://10.38.222.233:3000"],
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API is working");
});

app.use(globalErrorHandler);

export default app;
