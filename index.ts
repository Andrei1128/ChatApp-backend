import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
const httpServer = createServer(app);
export default new Server(httpServer);
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL as string);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      myProfileID: mongoose.Types.ObjectId;
    }
  }
}

import "./src/controllers/socket";
import authRouter from "./src/routers/user";
import authGuard from "./src//middlewares/authGuard";
import profileRouter from "./src/routers/profile";
import chatRouter from "./src/routers/chat";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/profile", authGuard, profileRouter);
app.use("/chat", authGuard, chatRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

httpServer.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT as string}...`);
});
