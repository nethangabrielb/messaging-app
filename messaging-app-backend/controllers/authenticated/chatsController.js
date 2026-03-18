import { prisma } from "../../clients/prismaClient.js";

 

const chatsController = (() => {
  const getChats = async (req, res) => {
    try {
      const userId = req.user.id;

      // Get chats where the room contains id of at least the user
      // making the request, returning the rooms associated with the
      // user
      const chats = await prisma.room.findMany({
        where: {
          users: {
            some: {
              id: Number(userId),
            },
          },
        },
        // We then filter this room to return the id of the other person
        // that is in the chat room. This allows us to render the recipient
        include: {
          users: {
            where: {
              id: {
                not: Number(userId),
              },
            },
            select: {
              id: true,
              username: true,
              avatar: true,
              status: true,
            },
          },
          Notification: true,
        },
      });

      return res.status(200).json({
        code: "RETRIEVE_SUCCESS",
        message: "Chats retrieved successfuly!",
        status: 200,
        data: chats,
      });
    } catch (e) {
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "There was an error handling the request",
        status: 500,
        data: e,
      });
    }
  };

  return { getChats };
})();

export default chatsController;
