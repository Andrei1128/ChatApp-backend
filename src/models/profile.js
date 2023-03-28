const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const profile = mongoose.model("profile", {
  nickname: { type: String, required: true, unique: true },
  friends: [{ type: mongoose.Schema.ObjectId, ref: "profile" }],
  chats: [{ type: mongoose.Schema.ObjectId, ref: "chat" }],
  requests: [{ type: mongoose.Schema.ObjectId, ref: "profile" }],
});

module.exports = profile;
