import app from "@/app";
import { PORT } from "@/constants/variables";
import "dotenv/config";

const start = async () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
};

start();
