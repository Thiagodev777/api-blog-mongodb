import { Router } from "express";
const router = Router();
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validNews } from "../middlewares/global.middleware.js";

router.post("/", authMiddleware, newsController.create);
router.get("/", newsController.getAll);
router.get("/top", newsController.topNews);
router.get("/:id", validId, validNews, newsController.findById);

export default router;
