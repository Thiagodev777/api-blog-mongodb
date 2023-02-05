import News from "../models/News.js";
import { v4 } from "uuid";

const newsService = {
  createService: (body) => News.create(body),
  findAllService: (offset, limit) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNews: () => News.countDocuments(),
  topNewsService: () => News.findOne().sort({ _id: -1 }).populate("user"),
  findByIdService: (id) => News.findById(id).populate("user"),
  searchByTitleService: (title) =>
    News.find({
      title: { $regex: `${title || ""}`, $options: "i" },
    })
      .sort({ _id: -1 })
      .populate("user"),
  byUserService: (id) =>
    News.find({
      user: id,
    })
      .sort({ _id: -1 })
      .populate("user"),
  updateService: (id, title, text, banner) =>
    News.findOneAndUpdate(
      { _id: id },
      { title, text, banner },
      { rawResult: true }
    ),
  deleteService: (id) => News.findOneAndDelete({ _id: id }),
  likeNewsService: (idNews, userId) =>
    News.findOneAndUpdate(
      { _id: idNews, "likes.userId": { $nin: [userId] } },
      { $push: { likes: { userId, created: new Date() } } }
    ),
  deleteLikeNewsService: async (idNews, userId) =>
    News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } }),
  addCommentService: async (idNews, comment, userId) => {
    let idComment = v4();
    return News.findOneAndUpdate(
      { _id: idNews },
      {
        $push: {
          comments: { idComment, userId, comment, createdAt: new Date() },
        },
      }
    );
  },
  deleteCommentService: async (idNews, idComment, userId) =>
    News.findByIdAndUpdate(
      { _id: idNews },
      { $pull: { comments: { idComment, userId } } }
    ),
};

export default newsService;
