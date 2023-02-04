import newsService from "../services/news.service.js";

export const validNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await newsService.findByIdService(id);
    if (!news) {
      return res.status(404).json({ message: "news not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
