import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import onConnection from "./events/connectionHandler.js";

import guestRouter from "./routes/guest/guestRouter.js";
import userRouter from "./routes/authenticated/userRouter.js";
import chatRouter from "./routes/authenticated/chatRouter.js";
import messageRouter from "./routes/authenticated/messageRouter.js";

dotenv.config();

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
  connectionStateRecovery: {},
});

app.use(cors());
app.use(express.json());

app.use("/api", guestRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.get("/api/ping", (req, res) => {
  res.json({ success: true });
});

io.on("connection", onConnection);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
