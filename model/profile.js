const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const profile = mongoose.model("profile", {
  nickname: { type: String, required: true, unique: true },
  chats: [{ type: mongoose.Schema.ObjectId, ref: "chat", unique: true }],
  requests: [{ type: mongoose.Schema.ObjectId, ref: "profile", unique: true }],
});

module.exports = profile;
