import express from "express";
import usersController from "../../controllers/authenticated/usersController.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const { Router } = express;

const userRouter = Router();

userRouter.get("/", verifyToken, usersController.getAllUsers);
userRouter.put("/:userId", verifyToken, usersController.editUserProfile);

export default userRouter;
