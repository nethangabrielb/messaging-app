import { body } from "express-validator";
import { prisma } from "../../clients/prismaClient.js";

 

export default body("username")
  .exists()
  .withMessage("Username is required")
  .trim()
  .notEmpty()
  .withMessage("Username can't be empty")
  .custom(async (value) => {
    const user = await prisma.user.findFirst({
      where: {
        username: value,
      },
    });
    if (user) {
      throw new Error("Username is already taken");
    }
  });
