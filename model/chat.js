const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const chat = mongoose.model("chat", {
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "profile",
      required: true,
    },
  ],
  messages: [{ type: mongoose.Schema.ObjectId, ref: "message" }],
});

module.exports = chat;
