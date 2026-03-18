import { prisma } from "../../clients/prismaClient.js";
import bcrypt from "bcryptjs";
import { validateRegistration } from "../../validators/user/registration.js";

const registerController = (() => {
  

  const register = [
    validateRegistration,
    async (req, res) => {
      try {
        const { username, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 15);

        // Register
        const registeredUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });

        const me = await prisma.user.findUnique({
          where: {
            username: "Nethan B.",
          },
        });

        if (registeredUser.id !== me.id) {
          // Create a room between me and the user
          const room = await prisma.room.create({
            data: {
              users: {
                connect: [{ id: registeredUser.id }, { id: me.id }],
              },
            },
          });

          await prisma.message.create({
            data: {
              senderId: me.id,
              message:
                "Hello! Thanks for trying out my Messaging App. When I first started, I had no idea how to even begin building a project like this. I set some goals for myself, and the path to achieving them felt like a deep, dark chasm I had to cross with everything I had. Each feature I wanted to implement felt like its own little chasm I needed to conquer, and overcoming each one was genuinely fun. Anyway, let me know what you think!",
              roomId: room.id,
            },
          });
        }

        res.status(201).json({
          code: "REGISTER_SUCCESS",
          message: "Registered successfully!",
          status: 201,
          data: registeredUser,
        });
      } catch (e) {
        res.status(400).json({
          code: "REGISTER_FAILED",
          message: e.message,
          status: 400,
        });
      }
    },
  ];

  return { register };
})();

export default registerController;
