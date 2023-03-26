const io = require("../index");
const profileModel = require("../model/profile");
const chatModel = require("../model/chat");

io.use(require("../middleware/socketGuard"));

io.on("connection", (socket) => {
  console.log(`${socket.id} connected..`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

io.on("connection", (socket) => {
  socket.on("private message", async ({ message, to }) => {
    socket.to(to).emit("private message", message);
    const profile = await profileModel.findOne({ nickname: to });
    const chat = await chatModel.findOne({ friend: profile._id });
    chat.messages.push(message);
    console.log(chat.messages);
    await chat.save();
  });
});
