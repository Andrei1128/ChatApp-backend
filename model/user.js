const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const user = mongoose.model("user", {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.ObjectId, ref: "profile" },
});

module.exports = user;
