import app from "@/app";
import connectMongo from "@/config/mongo";
import { PORT } from "@/constants/variables";
import "dotenv/config";

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
};

start();
