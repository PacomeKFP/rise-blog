const {
  getAllComments,
  getCommentById,
  createNewComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments.ctrl");

const router = require("express").Router({ mergeParams: true });

router.get("/", getAllComments);
router.get("/:id", getCommentById);

router.post("/", createNewComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

//EXERCISE ecrire la route pour obtenir la liste des commentaires d'un utilisateur

module.exports = { CommentRouter: router };
