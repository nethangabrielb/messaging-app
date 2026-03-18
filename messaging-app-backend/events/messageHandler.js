import { prisma } from "../clients/prismaClient.js";
import jwt from "jsonwebtoken";

const messageHandler = async (message, token, roomId, callback) => {
  const senderData = jwt.verify(token, process.env.JWT_SECRET);
  const parsedRoomId = Number(roomId);

  const returnedMessage = await prisma.message.create({
    data: {
      message,
      senderId: senderData.id,
      roomId: parsedRoomId,
    },
  });

  if (returnedMessage) {
    callback({ success: true });
    return { success: true, senderData };
  }
};

export default messageHandler;
