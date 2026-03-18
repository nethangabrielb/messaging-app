import { prisma } from "../clients/prismaClient.js";
import jwt from "jsonwebtoken";

 

const messageHandler = async (message, token, roomId, callback) => {
  const senderData = jwt.verify(token, process.env.JWT_SECRET);
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  const returnedMessage = await prisma.message.create({
    data: {
      message,
      senderId: senderData.id,
      roomId: room.id,
    },
  });

  if (returnedMessage) {
    callback({ success: true });
    return { success: true, senderData };
  }
};

export default messageHandler;
