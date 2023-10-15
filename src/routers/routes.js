const { ArticleRouter } = require("./articles.routes");
const { CommentRouter } = require("./comments.routes");
const { TopicRouter } = require("./topics.routes");
const router = require("express").Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send("Hello guys !");
});

router.use("/topics", TopicRouter);
router.use("/comments", CommentRouter);
router.use("/articles", ArticleRouter);

module.exports = { AppRouter: router };
