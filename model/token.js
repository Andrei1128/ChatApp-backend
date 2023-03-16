const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const token = mongoose.model("token", {
  content: { type: String },
});

module.exports = token;
