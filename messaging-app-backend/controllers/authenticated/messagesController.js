import { prisma } from "../../clients/prismaClient.js";

 

const messagesController = (() => {
  const getRoomMessages = async (req, res) => {
    const { roomId } = req.params;

    const room = await prisma.message.findMany({
      where: {
        room: {
          id: Number(roomId),
        },
      },
    });

    res.status(200).json({
      code: "MESSAGES_RETRIEVED",
      message: "Messages retrieved successfuly!",
      data: room,
    });
  };

  return { getRoomMessages };
})();

export default messagesController;
