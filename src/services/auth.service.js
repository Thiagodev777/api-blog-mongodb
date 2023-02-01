import User from "../models/User.js";

const authService = {
  loginService: async (email) =>
    User.findOne({ email: email }).select("+password"),
};

export default authService;
