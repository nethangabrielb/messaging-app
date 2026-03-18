import { prisma } from "../clients/prismaClient.js";
import jwt from "jsonwebtoken";

 

const connectHandler = async (token, status) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const updatedUserStatus = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      status,
    },
  });

  if (updatedUserStatus) {
    return true;
  }
};

export default connectHandler;
