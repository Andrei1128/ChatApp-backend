const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", require("./router/user"));
app.use("/profile", require("./middleware/guard"), require("./router/profile"));

io.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    console.log("invalid nickname!");
    return next(new Error("Invalid nickname!"));
  }
  socket.nickname = nickname;
  next();
});
io.on("connection", (socket) => {
  console.log(`${socket.nickname} connected..`);
});

io.on("connection", (socket) => {
  socket.on("chat", ({ content, to }) => {
    console.log(content, to);
    socket
      .to(to)
      .to(socket.nickname)
      .emit("chat", { content, from: socket.nickname, to });
  });
});

httpServer.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
