const app = require("express")();
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error("Missing nickname!"));
  }
  socket.id = nickname;
  next();
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected..`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

io.on("connection", (socket) => {
  socket.on("private message", ({ message, to }) => {
    socket.to(to).emit("private message", message);
  });
});

app.use("/auth", require("./router/user"));
app.use("/profile", require("./middleware/guard"), require("./router/profile"));

httpServer.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
