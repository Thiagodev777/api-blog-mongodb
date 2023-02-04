import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";
import { validId } from "../middlewares/global.middleware.js";
import {
  validUser,
  validEmail,
  duplicateEmail,
} from "../middlewares/user.middleware.js";

router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.post("/", validEmail, duplicateEmail, userController.create);
router.patch(
  "/:id",
  validId,
  validUser,
  validEmail,
  duplicateEmail,
  userController.update
);

export default router;
