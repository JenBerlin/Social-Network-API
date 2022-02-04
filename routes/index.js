const router = require("express").Router();
// const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

// router.use("/thoughts", thoughtRoutes);
router.use("/api/users", userRoutes);

module.exports = router;
