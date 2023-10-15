const { CommentModel } = require("../models/comment.model");

async function createNewComment(req, res) {
  try {
    //reccuperer les donneées de la requette afin ce creer le comment
    const data = req.body;

    //TODO verifier que l'article est bien existant
    //TODO verifier que l'autheur est correct

    //TODO recupperer l'id de l'autheur directement dans les cookie de la requette via l'auth mid

    const comment = await CommentModel.create(data);
    return res
      .status(201)
      .json({ message: "Commentaire créé avec success", comment });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function getAllComments(req, res) {
  try {
    const comments = await CommentModel.find();
    //TODO Populate author here after writing author data

    return res.status(200).json({
      message: "Liste des commentaires disponibles",
      comments,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function getCommentById(req, res) {
  try {
    const comment = await CommentModel.findOne({ _id: req.params.id });
    //TODO Populate author here after writing author data

    return res.status(200).json({
      message:
        comment == null
          ? "Ce commentaire n'exixte pas"
          : "Commentaire reccupéré avec success",
      comment,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}

async function updateComment(req, res) {
  try {
    const content = req.body.content;
    //TODO : add the landing link key in the req body when using the middleware

    const comment = await CommentModel.findOneAndUpdate(
      { _id: req.params.id },
      { content },
      { new: true, upsert: false }
    );
    return res
      .status(200)
      .json({ message: "Commentaire modifié avec success", comment });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function deleteComment(req, res) {
  try {
    const comment = await CommentModel.findOneAndDelete({ _id: req.params.id });
    //TODO delete comment reference in related Article document
    //TODO delete comment reference in related Author document

    return res.status(comment == null ? 400 : 200).json({
      message:
        comment == null
          ? "Ce commentaire n'existe pas"
          : "Commentaire supprimé avec success",
      comment,
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
  createNewComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
