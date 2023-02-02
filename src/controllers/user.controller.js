import userService from "../services/user.service.js";

const userController = {
  create: async (req, res) => {
    try {
      const requiredFields = [
        "name",
        "username",
        "email",
        "password",
        "avatar",
        "background",
      ];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({ message: `${field} is required` });
        }
      }
      const user = await userService.createService({ ...req.body });
      if (!user) {
        return res.status(400).json({ message: "Error creating User" });
      }
      return res.status(201).json({ id: user._id, ...req.body });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const users = await userService.findAllService();
      if (users.length === 0) {
        return res
          .status(400)
          .json({ message: "there are no registered users" });
      }
      res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      return res.json(req.user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id, user } = req;
      const { name, username, email, password, avatar, background } = req.body;
      if (!name && !username && !email && !password && !avatar && !background) {
        return res
          .status(400)
          .json({ error: "Submit at least one field for update" });
      }
      await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
      );
      res.json({ message: "User sucessfully update!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
