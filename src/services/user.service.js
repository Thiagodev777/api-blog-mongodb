import User from "../models/User.js";

const userService = {
  createService: (body) => User.create(body),
  findAllService: () => User.find(),
  findByIdService: (id) => User.findById(id),
  findByEmailService: (email) => User.findOne({ email: email }),
  updateService: (user) => User.findOneAndUpdate({ _id: user.id }, { ...user }),
};

export default userService;
