const router = require("express").Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send("Hello guys !");
});


module.exports = { AppRouter: router };
