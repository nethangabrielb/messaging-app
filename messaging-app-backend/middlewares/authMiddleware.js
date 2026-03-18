import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(403).json({
        code: "UNAUTHORIZED",
        message: "You are unauthorized to access the data",
        status: 403,
      });
    }

    const token = bearerToken.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (!data) {
      return res.status(403).json({
        code: "UNAUTHORIZED",
        message: "You are unauthorized to access the data",
        status: 403,
      });
    }

    req.user = data;
    next();
  } catch {
    return res.status(403).json({
      code: "UNAUTHORIZED",
      message: "You are unauthorized to access the data",
      status: 403,
    });
  }
};

export default verifyToken;
