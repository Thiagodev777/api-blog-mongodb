import mongoose from "mongoose";
import userService from "../services/user.service.js";
import validator from "validator";

export const validId = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findByIdService(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    req.id = id;
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const duplicateEmail = async (req, res, next) => {
  try {
    const emailIsDuplicate = await userService.findByEmailService(
      req.body.email
    );
    if (emailIsDuplicate) {
      return res.status(400).json({ message: "email already exists" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const validEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid email" });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
