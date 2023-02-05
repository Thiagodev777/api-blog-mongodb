import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import connectDatabase from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";
import swaggerRoute from "./src/routes/swagger.route.cjs";

connectDatabase();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.use((req, res) => {
  return res.status(404).json({ message: "route not found" });
});

app.listen(8089, () =>
  console.log(`Server running on port ${process.env.PORT || 8089}`)
);
