const { UserModel } = require("../models/user.model");

async function createNewUser(req, res) {
  try {
    const data = req.body;

    const user = await UserModel.create(data);
    // supprimer le mot de passe de l'utilisateur des données qu'on renvoie au front
    delete user._doc.password;
    //TODO ajouter le modalités pour l'inscription: creation du token et envoie
    res.status(201).json({
      message: "Utilisateur créé avec success",
      user,
      //ajouter l'access token dans la reponse
    });
  } catch (error) {
    //TODO :Implements Error Handling
    console.log(err);
    return res
      .status(400)
      .json({ message: "Une erreur est survenue", erreur: err });
  }
}
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find().select('-password');

    return res.status(200).json({
      message: 'Liste des utilisateurs',
      users
    });

  } catch (error) {
    console.error(error);

    // Handle different error cases
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({
        message: 'Requête invalide'
      });
    } else {
      return res.status(500).json({
        message: 'Erreur interne du serveur'
      });
    }
  }
}
async function getUserById(req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    return res.status(200).json({
      message : "Données utilisateur reccupérées",
      user
    });

  } catch (error) {
    console.error(error);

    // Handle different error cases
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({
        message: 'ID utilisateur invalide' 
      });
    } else {
      return res.status(500).json({
        message: 'Erreur interne du serveur'
      });
    }
  }
}
async function updateUser(req, res) {
  try {
    const updatedData = req.body;

    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id }, 
      updatedData,
      { new: true }
    );

    if(!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'  
      });
    }

    return res.status(200).json({
      message: 'Utilisateur mis à jour avec succès',
      user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
}
/**
 * Deletes a user by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * @returns {Promise} - Promise that resolves to the response object
 * 
 * Finds a user by ID, deletes the user if found, 
 * and returns a response with a success or error message.
 */
async function deleteUser(req, res) {

  try {
    // Find user by ID
    const user = await UserModel.findById(req.params.id);

    //TODO delete articles related to User, 
    //TODO delete all comments from user
    //TODO delete user likes (in articles)
    

    // If no user, return 404
    if(!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    // Delete user
    await user.remove();

    // Return 200 OK
    return res.status(200).json({
      message: 'Utilisateur supprimé avec succès'
    });

  } catch (error) {
    // Log error
    console.error(error);

    // Return 500 Internal Server Error 
    return res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
}

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
