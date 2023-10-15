const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.ctrl.js");

const router = require("express").Router({ mergeParams: true });

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/", createNewUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

//TODO ajouter les routes d'authentifications: login

module.exports = { UserRouter: router };
