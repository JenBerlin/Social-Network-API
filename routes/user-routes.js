const router = require("express").Router();

router.route("/").get(function (req, res) {
  return res.json({ a: "Hello" });
});

module.exports = router;
