import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authService = {
  loginService: async (email) =>
    User.findOne({ email: email }).select("+password"),

  generateToken: async (id) =>
    jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "1d" }),
};
export default authService;
