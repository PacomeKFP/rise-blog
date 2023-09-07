const { TopicRouter } = require("./topics.routes");
const router = require("express").Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send("Hello guys !");
});

router.use('/topics', TopicRouter)

module.exports = { AppRouter: router };
