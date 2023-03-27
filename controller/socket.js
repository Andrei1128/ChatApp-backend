const io = require("../index");
const chatModel = require("../model/chat");
const messageModel = require("../model/message");

io.use(require("../middleware/socketGuard"));

io.on("connection", (socket) => {
  console.log(`${socket.id} connected..`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected!`);
  });
});

io.on("connection", (socket) => {
  socket.on("private message", async ({ message, from, id }) => {
    const newMessage = await messageModel.create({
      content: message,
      from: from,
    });
    const foundMessage = await messageModel
      .findById(newMessage._id)
      .populate("from");
    io.emit(id, foundMessage);
    const conv = await chatModel.findById(id);
    conv.messages.push(newMessage);
    await conv.save();
  });
});
