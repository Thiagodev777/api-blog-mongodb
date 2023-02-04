import { Router } from "express";
const router = Router();
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";
import { validNews } from "../middlewares/news.middleware.js";

router.post("/", authMiddleware, newsController.create);
router.get("/", newsController.getAll);
router.get("/top", newsController.topNews);
router.get("/search", newsController.searchByTitle);
router.get("/:id", authMiddleware, validId, validNews, newsController.findById);
export default router;
