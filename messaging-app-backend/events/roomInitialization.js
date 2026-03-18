import jwt from "jsonwebtoken";
import { prisma } from "../clients/prismaClient.js";

 

const initializeRoom = async (token, recipientId, callback) => {
  const client = jwt.verify(token, process.env.JWT_SECRET);
  delete client.iat;
  const recipient = await prisma.user.findUnique({
    where: {
      id: Number(recipientId),
    },
  });

  // Find room if it exists
  const room = await prisma.room.findFirst({
    where: {
      AND: [
        { users: { some: { id: client.id } } },
        { users: { some: { id: recipient.id } } },
      ],
    },
  });

  if (room) {
    callback({ success: true, message: null, room });
  } else {
    // Otherwise create new room
    const roomNew = await prisma.room.create({
      data: {
        users: {
          connect: [{ id: client.id }, { id: recipient.id }],
        },
      },
    });

    if (roomNew) {
      callback({
        success: true,
        message: "Chatroom created successfully!",
        room: roomNew,
      });
    } else {
      callback({
        success: false,
        message: "There was an issue creating chatroom.",
        room: roomNew,
      });
    }
  }
};

export default initializeRoom;
