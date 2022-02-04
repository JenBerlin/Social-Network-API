const express = require("express");
const db = require("./config/connection");
// Require model
const User = require("./models/User");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once("open", async () => {
  const result = await User.find({});
  console.log(result);
  // app.listen(PORT, () => {
  //   console.log(`API server running on port ${PORT}!`);
  // });
});
