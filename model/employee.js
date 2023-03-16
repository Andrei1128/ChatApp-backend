const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const employee = mongoose.model("employee", {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = employee;
