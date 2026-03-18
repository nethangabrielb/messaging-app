import express from "express";
import verifyToken from "../../middlewares/authMiddleware.js";
import chatsController from "../../controllers/authenticated/chatsController.js";

const { Router } = express;

const chatRouter = Router();

chatRouter.get("/", verifyToken, chatsController.getChats);

export default chatRouter;
