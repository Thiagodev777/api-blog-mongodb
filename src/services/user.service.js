import User from "../models/User.js";
import bcrypt from "bcrypt";

const userService = {
  createService: (body) => User.create(body),
  findAllService: () => User.find(),
  findByIdService: (id) => User.findById(id),
  findByEmailService: (email) => User.findOne({ email: email }),
  updateService: async (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  ) =>
    User.findOneAndUpdate(
      { _id: id },
      {
        name,
        username,
        email,
        password: password ? await bcrypt.hash(password, 10) : password,
        avatar,
        background,
      }
    ),
};

export default userService;
