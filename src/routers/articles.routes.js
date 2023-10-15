const {
  getAllArticles,
  getArticleById,
  createNewArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles.ctrl.js");

const router = require("express").Router({ mergeParams: true });

router.get("/", getAllArticles);
router.get("/:id", getArticleById);

router.post("/", createNewArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

//EXERCISE ecrire la route pour obtenir les utilisateur s 

module.exports = { ArticleRouter: router };
