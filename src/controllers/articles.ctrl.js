const { ArticleModel } = require("../models/article.model");

async function createNewArticle(req, res) {
  try {
    const data = req.body;
    //TODO s'assurer que le landing image link est bien sur la clé landing
    //TODO s'assurer que l'auteru est bien recuppéré depuis les cookies de la requette authmid
    const article = await ArticleModel.create(data);

    return res
      .status(201)
      .json({ message: "Article créé avec success", article });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function getAllArticles(req, res) {
  try {
    const articles = await ArticleModel.find();
    //TODO Populate author here after writing author data

    return res.status(200).json({
      message: "Liste des articles disponibles",
      articles,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function getArticleById(req, res) {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id });
    //TODO Populate author here after writing author data

    return res.status(200).json({
      message:
        article == null
          ? "Cet article n'existe pas"
          : "Article reccupéré avec success",
      article,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function updateArticle(req, res) {
  try {
    const data = req.body;
    //TODO : add the landing link key in the req body when using the middleware

    const article = await ArticleModel.findOneAndUpdate(
      { _id: req.params.id },
      data,
      { new: true, upsert: false }
    );
    return res.status(article == null ? 400 : 200).json({
      message:
        article == null
          ? "Cet article n'exsite pas"
          : "Article modifié avec success",
      article,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function deleteArticle(req, res) {
  try {
    const article = await ArticleModel.findOneAndDelete({ _id: req.params.id });
    //TODO supprimer tous les commetaires liés à cet article
    //TODO Retirer cet article dans les articles publiés chez son auteur
    //TODO retirer cet article dans les articles des differents sujets liés
    return res.status(article == null ? 400 : 200).json({
      message:
        article == null
          ? "Cet article n'exsite pas"
          : "Article supprimé avec success",
      article,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}

module.exports = {
  createNewArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
