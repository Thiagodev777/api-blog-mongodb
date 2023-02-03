import newsService from "../services/news.service.js";

const newsController = {
  create: async (req, res) => {
    const { title, text, banner } = req.body;
    try {
      const requiredFields = ["title", "text", "banner"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({ message: `${field} is required` });
        }
      }
      await newsService.createService({
        title,
        text,
        banner,
        user: req.userId,
      });
      res.json({ message: "ok" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const news = await newsService.findAllService();
      if (news.length === 0) {
        return res
          .status(400)
          .json({ message: "there are no registered news" });
      }
      res.json(news);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default newsController;
