const {
  getAllTopics,
  getTopicById,
  createNewTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topics.ctrl");

const router = require("express").Router({ mergeParams: true });

router.get("/", getAllTopics);
router.get("/:id", getTopicById);

router.post("/", createNewTopic);
router.patch("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = { TopicRouter: router };
