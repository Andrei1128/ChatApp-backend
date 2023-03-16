const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const company = mongoose.model("company", {
  name: { type: String, required: true },
  employee: [{ type: mongoose.Schema.ObjectId, ref: "employee" }],
});

module.exports = company;
