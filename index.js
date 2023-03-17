const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const guard = require("./middleware/guard");
app.use("/auth", require("./router/user"));
app.use("/profile", guard, require("./router/profile"));

io.on("connection", (socket) => console.log(socket.id));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", { name: socket.id, message: msg });
  });
});

server.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
