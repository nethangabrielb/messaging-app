import { prisma } from "../clients/prismaClient.js";

const notificationHandler = async (userId, roomId) => {
  let updatedNotification = null;

  // check if notification exists for the associated user and room
  const notification = await prisma.notification.findFirst({
    where: {
      AND: [{ roomId }, { userId }],
    },
  });

  // if notification alraedy exist we increment
  // otherwise we create a new one
  if (notification) {
    updatedNotification = await prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  } else {
    updatedNotification = await prisma.notification.create({
      data: {
        count: 1,
        roomId,
        userId,
      },
    });
  }

  if (updatedNotification) {
    return { success: true };
  }
};

const clearNotificationHandler = async (userId, roomId) => {
  const notification = await prisma.notification.findFirst({
    where: {
      AND: [{ roomId }, { userId }],
    },
  });

  // delete if it exists
  if (notification) {
    const deletedNotification = await prisma.notification.delete({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    });

    if (deletedNotification) {
      return { success: true };
    }
  } else {
    return { success: false };
  }
};

export { notificationHandler, clearNotificationHandler };
