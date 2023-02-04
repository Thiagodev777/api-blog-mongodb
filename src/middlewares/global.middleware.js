import mongoose from "mongoose";

export const validId = (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.query);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
