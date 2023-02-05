import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";
import { validId } from "../middlewares/global.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  validUser,
  validEmail,
  duplicateEmail,
} from "../middlewares/user.middleware.js";

router.get("/", authMiddleware, userController.findAll);
router.get("/:id", authMiddleware, validId, validUser, userController.findById);
router.post("/", validEmail, duplicateEmail, userController.create);
router.patch(
  "/:id",
  authMiddleware,
  validId,
  validUser,
  validEmail,
  duplicateEmail,
  userController.update
);

export default router;
