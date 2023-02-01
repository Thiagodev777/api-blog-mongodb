import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authService.loginService(email);
      if (!user) {
        return res
          .status(404)
          .json({ message: "email or password are invalid" });
      }
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res
          .status(401)
          .json({ message: "email or password are invalid" });
      }
      return res.json({ message: "token" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default authController;
