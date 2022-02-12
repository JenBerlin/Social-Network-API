const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createThoughtReaction,
  deleteThoughtReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reaction").post(createThoughtReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(deleteThoughtReaction);

module.exports = router;
