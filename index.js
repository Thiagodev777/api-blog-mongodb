import express from "express";
const app = express();
import connectDatabase from "./src/database/db.js";

import userRoute from "./src/routes/user.route.js";
const port = 8089;

connectDatabase();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoute);

app.listen(8089, () => console.log(`Server running on port ${port}`));
