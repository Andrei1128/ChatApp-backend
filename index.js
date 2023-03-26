const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const httpServer = require("http").createServer(app);
module.exports = require("socket.io")(httpServer);

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./controller/socket");
app.use("/auth", require("./router/user"));
app.use(
  "/profile",
  require("./middleware/authGuard"),
  require("./router/profile")
);

httpServer.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
