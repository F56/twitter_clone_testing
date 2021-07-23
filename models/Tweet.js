const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    content: { type: String, required: true, maxLength: 140 },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = tweetSchema;
