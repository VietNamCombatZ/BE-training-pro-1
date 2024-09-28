import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());


app.use("/auth", new authRoutes().router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
