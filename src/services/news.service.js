import News from "../models/News.js";

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
};

export default newsService;
