import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDatabase from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import newsRoute from "./src/routes/news.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";

connectDatabase();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(8089, () =>
  console.log(`Server running on port ${process.env.PORT || 8089}`)
);
