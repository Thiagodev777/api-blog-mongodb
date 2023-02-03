import News from "../models/News.js";

const newsService = {
  createService: (body) => News.create(body),
  findAllService: () => News.find(),
};

export default newsService;
