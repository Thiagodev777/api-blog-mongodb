import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "token is required" });
  }
  const parts = authorization.split(" ");
  const [bearer, token] = parts;
  if (bearer !== "Bearer" || parts.length !== 2) {
    return res.status(401).json({ message: "invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    try {
      if (error) {
        return res.status(401).json({ message: "invalid token" });
      }
      const user = await userService.findByIdService(payload.id);
      if (!user || !user.id) {
        return res.status(401).json({ message: "invalid token" });
      }
      req.userId = payload.id;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};
