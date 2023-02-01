import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";

import {
  validId,
  validUser,
  duplicateEmail,
} from "../middlewares/global.middleware.js";

router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.post("/", duplicateEmail, userController.create);
router.patch("/:id", validId, validUser, duplicateEmail, userController.update);

export default router;
