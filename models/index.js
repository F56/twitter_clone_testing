const mongoose = require("mongoose");
const tweetSchema = require("./Tweet");
const userSchema = require("./User");

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = {
  User,
  Tweet,
};
