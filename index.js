const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const httpServer = require("http").createServer(app);
module.exports = require("socket.io")(httpServer);

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./src/controllers/socket");
app.use("/auth", require("./src/routers/user"));
app.use(
  "/profile",
  require("./src//middlewares/authGuard"),
  require("./src/routers/profile")
);

httpServer.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
