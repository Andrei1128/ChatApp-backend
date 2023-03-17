const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const profile = mongoose.model("profile", {
  nickname: { type: String, required: true },
  friends: [{ type: mongoose.Schema.ObjectId, ref: "profile" }],
  requests: [{ type: mongoose.Schema.ObjectId, ref: "profile" }],
});

module.exports = profile;
