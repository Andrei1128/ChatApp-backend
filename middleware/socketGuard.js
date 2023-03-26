const socketGuard = (socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (nickname) {
    socket.id = nickname;
    next();
  } else return next(new Error("Missing nickname!"));
};

module.exports = socketGuard;
