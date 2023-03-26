const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const messageModel = mongoose.model("message", {
  content: { type: String },
  from: { type: mongoose.Schema.ObjectId, ref: "profile", required: true },
});

module.exports = messageModel;
