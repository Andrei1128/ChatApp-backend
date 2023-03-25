const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const chat = mongoose.model("chat", {
  friend: {
    type: mongoose.Schema.ObjectId,
    ref: "profile",
    required: true,
    unique: true,
  },
  messages: [{ type: String }],
});

module.exports = chat;
