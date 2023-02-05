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
      let { limit, offset } = req.query;
      limit = Number(limit);
      offset = Number(limit);
      if (!limit) {
        limit = 5;
      }
      if (!offset) {
        offset = 0;
      }

      const next = offset + limit;
      const total = await newsService.countNews();
      const currentUrl = req.baseUrl;

      const nextUrl =
        next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

      const previous = offset - limit < 0 ? null : offset - limit;
      const previousUrl =
        previous != null
          ? `${currentUrl}?limit=${limit}&offset=${previous}`
          : null;

      const news = await newsService.findAllService(offset, limit);
      if (news.length === 0) {
        return res
          .status(400)
          .json({ message: "there are no registered news" });
      }
      res.json({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        results: news.map((newsItem) => ({
          id: newsItem._id,
          title: newsItem.title,
          text: newsItem.text,
          banner: newsItem.banner,
          likes: newsItem.likes,
          comments: newsItem.comments,
          name: newsItem.user.name,
          username: newsItem.user.username,
          userAvatar: newsItem.user.avatar,
        })),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  topNews: async (req, res) => {
    try {
      const news = await newsService.topNewsService();
      if (!news) {
        return res.status(400).json({ message: "There is no registered post" });
      }
      res.json({
        news: {
          id: news._id,
          title: news.title,
          text: news.text,
          banner: news.banner,
          likes: news.likes,
          comments: news.comments,
          name: news.user.name,
          username: news.user.username,
          userAvatar: news.user.avatar,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsService.findByIdService(id);
      res.json({
        news: {
          id: news._id,
          title: news.title,
          text: news.text,
          banner: news.banner,
          likes: news.likes,
          comments: news.comments,
          name: news.user.name,
          username: news.user.username,
          userAvatar: news.user.avatar,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  searchByTitle: async (req, res) => {
    try {
      const { title } = req.query;
      const news = await newsService.searchByTitleService(title);
      if (news.length === 0) {
        return res
          .status(400)
          .json({ message: "There are no news with this title" });
      }
      return res.json({
        results: news.map((newsItem) => ({
          id: newsItem._id,
          title: newsItem.title,
          text: newsItem.text,
          banner: newsItem.banner,
          likes: newsItem.likes,
          comments: newsItem.comments,
          name: newsItem.user.name,
          username: newsItem.user.username,
          userAvatar: newsItem.user.avatar,
        })),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  byUser: async (req, res) => {
    try {
      const id = req.userId;
      const news = await newsService.byUserService(id);
      return res.json({
        results: news.map((newsItem) => ({
          id: newsItem._id,
          title: newsItem.title,
          text: newsItem.text,
          banner: newsItem.banner,
          likes: newsItem.likes,
          comments: newsItem.comments,
          name: newsItem.user.name,
          username: newsItem.user.username,
          userAvatar: newsItem.user.avatar,
        })),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { title, text, banner } = req.body;
      const { id } = req.params;
      if (!title && !banner && !text) {
        return res
          .status(400)
          .json({ message: "Submit at least one field to update the news" });
      }
      const news = await newsService.findByIdService(id);
      if (news.user._id != req.userId) {
        return res.status(400).json({ message: "You didn't update this post" });
      }
      await newsService.updateService(id, title, text, banner);
      return res.json({ message: "News successfully update" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsService.findByIdService(id);
      if (news.user._id != req.userId) {
        return res.status(400).json({ message: "You didn't delete this post" });
      }
      await newsService.deleteService(id);
      return res.json({ message: "News delete successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  likeNews: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const newsLiked = await newsService.likeNewsService(id, userId);
      if (!newsLiked) {
        await newsService.deleteLikeNewsService(id, userId);
        return res.status(200).json({ message: "Like successfully removed" });
      }
      return res.json({ message: "Like done successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  addComment: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const { comment } = req.body;

      if (!comment) {
        return res.status(400).json({ message: "Write a message to comment" });
      }

      await newsService.addCommentService(id, comment, userId);

      res.json({ message: "Comment successfuly completed" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { idNews, idComment } = req.params;
      const userId = req.userId;

      const commentDeleted = await newsService.deleteCommentService(
        idNews,
        idComment,
        userId
      );

      const commentFind = commentDeleted.comment.find(
        (comment) => comment.idComment === idComment
      );

      if (!commentFind) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (commentFind.userId !== userId) {
        return res
          .status(400)
          .json({ message: "You can't delete this comment" });
      }

      res.json({ message: "Comment successfuly removed" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default newsController;
