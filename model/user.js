const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const user = mongoose.model("user", {
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = user;
