import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDatabase from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";

connectDatabase();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoute);

app.listen(8089, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
