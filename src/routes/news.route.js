import { Router } from "express";
const router = Router();
import newsController from "../controllers/news.controller.js";

router.post("/", newsController.create);
router.get("/", newsController.getAll);

export default router;
