import { prisma } from "../clients/prismaClient.js";

const notificationHandler = async (userId, roomId) => {
  const parsedUserId = Number(userId);
  const parsedRoomId = Number(roomId);

  const updatedNotification = await prisma.notification.upsert({
    where: {
      userId_roomId: {
        userId: parsedUserId,
        roomId: parsedRoomId,
      },
    },
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      count: 1,
      roomId: parsedRoomId,
      userId: parsedUserId,
    },
  });

  if (updatedNotification) {
    return { success: true };
  }
};

const clearNotificationHandler = async (userId, roomId) => {
  const parsedUserId = Number(userId);
  const parsedRoomId = Number(roomId);

  const deletedNotification = await prisma.notification.deleteMany({
    where: {
      userId: parsedUserId,
      roomId: parsedRoomId,
    },
  });

  if (deletedNotification.count === 0) {
    return { success: false };
  }

  return { success: true };
};

export { notificationHandler, clearNotificationHandler };
