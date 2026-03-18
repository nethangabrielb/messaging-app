import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  const data = jwt.verify(token, process.env.JWT_SECRET);

  if (data) {
    req.user = data;
    next();
  } else {
    res.status(403).json({
      code: "UNAUTHORIZED",
      message: "You are unauthorized to access the data",
      status: 403,
    });
  }
};

export default verifyToken;
