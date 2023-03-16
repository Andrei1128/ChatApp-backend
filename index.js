app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const guard = require("./middleware/guard");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", require("./router/user"));
app.use("/company", guard, require("./router/company"));
app.use("/company", guard, require("./router/employee"));

app.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
