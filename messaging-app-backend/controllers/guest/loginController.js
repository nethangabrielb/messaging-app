import { prisma } from "../../clients/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = (() => {
  

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: "LOGIN_FIELDS_MISSING",
        message: "Login fields are missing",
        status: 400,
      });
    }

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Return error if user is not found
    if (!user) {
      return res.status(404).json({
        code: "INVALID_email",
        message: "Email is not found",
        status: 404,
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: "INVALID_PASSWORD",
        message: "Password is incorrect",
        status: 401,
      });
    }

    // Generate jwt token
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({
      code: "LOGIN_SUCCESS",
      message: "Logged in successfuly!",
      status: 200,
      data: {
        token,
      },
    });
  };

  return { login };
})();

export default loginController;
