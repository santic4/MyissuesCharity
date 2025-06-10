import { Router } from "express";
import { handleChat } from "../controllers/chatbotController.js";

const chatRouter = Router();

chatRouter.post('/chat', handleChat);

export default chatRouter;