import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";

import {
  validId,
  validUser,
  duplicateEmail,
  validEmail,
} from "../middlewares/global.middleware.js";

router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.post("/", validEmail, duplicateEmail, userController.create);
router.patch(
  "/:id",
  validEmail,
  validId,
  validUser,
  duplicateEmail,
  userController.update
);

export default router;
