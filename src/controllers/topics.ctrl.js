const { TopicModel } = require("../models/topic.model");

async function getAllTopics(req, res) {
  try {
    const topics = await TopicModel.find();
    

    return res.status(200).json({
      message: "Liste des sujets disponibles",
      topics,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}
async function getTopicById(req, res) {
  try {
    const topic = await TopicModel.findOne({ _id: req.params.id });

    return res.status(200).json({
      message:
        topic == null ? "Ce sujet n'existe " : "Sujet reccupéré avec success",
      topic,
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(error);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: error });
  }
}

async function createNewTopic(req, res) {
  try {
    const topicLabel = req.body.label;
    // const topicLanding = req.body.landingLink;

    //TODO :upload landing image, Add it link in the request data and create the TopicModel Instance with it
    const topic = await TopicModel.create({ label: topicLabel });
    return res.status(201).json({ message: "sujet Créé avec success", topic });
  } catch (err) {
    //TODO :Implements Error Handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}
async function updateTopic(req, res) {
  try {
    const data = req.body;
    //TODO : add the landing link key in the req body when using the middleware

    const topic = await TopicModel.findOneAndUpdate(
      { _id: req.params.id },
      data,
      { new: true, upsert: false }
    );
    return res
      .status(200)
      .json({ message: "Sujet modifié avec success", topic });
  } catch (err) {
    //TODO :Implements Error Handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}
async function deleteTopic(req, res) {
  try {
    const topic = await TopicModel.findOneAndDelete({ _id: req.params.id });

    //TODO : Delete the reference to the topin in concerned articles

    return res
      .status(200)
      .json({ message: "Sujet Supprimé avec success", topic });
  } catch (err) {
    //TODO :Implements Error Handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}

module.exports = {
  getAllTopics,
  getTopicById,
  createNewTopic,
  updateTopic,
  deleteTopic,
};
