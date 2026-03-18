import initializeRoom from "./roomInitialization.js";
import connectHandler from "./connectHandler.js";
import messageHandler from "./messageHandler.js";
import {
  notificationHandler,
  clearNotificationHandler,
} from "./notificationHandler.js";

import { io } from "../app.js";

const onConnection = (socket) => {
  // set user to online upon login event
  socket.on("set status", async (token, status, callback) => {
    const isSuccess = await connectHandler(token, status);

    if (isSuccess) {
      callback({ success: true });
      socket.broadcast.emit("set status", { refetch: true });
    }
  });

  // create room event
  socket.on("create room", initializeRoom);

  // message event
  socket.on("message", async (message, token, roomId, randomId, callback) => {
    const { success, senderData } = await messageHandler(
      message,
      token,
      roomId,
      callback
    );

    if (success) {
      io.emit("message", message, senderData, randomId, roomId);
    }
  });

  // join room event
  socket.on("join room", (room) => {
    socket.join(room);
  });

  // notifications handler
  socket.on("notification", async (roomId, senderId) => {
    const { success } = await notificationHandler(senderId, roomId);

    if (success) {
      io.emit("notification", senderId, success);
    }
  });

  socket.on("clear notifications", async (userId, roomId) => {
    const { success } = await clearNotificationHandler(userId, roomId);

    if (success) {
      socket.emit("clear notifications", success);
    }
  });
};

export default onConnection;
