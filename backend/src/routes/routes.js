import { Router } from "express";
import userRouter from "./userRoutes.js";
import campaignRouter from "./campaignRoutes.js";
import donationRouter from "./donationRoutes.js";
import interactionRouter from "./interactionRoutes.js";
import adminRouter from "./adminRoutes.js";
import authRouter from "./authRouter.js";
import chatRouter from "./chatbotRouter.js";

const router = Router();

router.use('/users', userRouter);
router.use('/campaign', campaignRouter);
router.use('/donation', donationRouter);
router.use('/interaction', interactionRouter);
router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/chatbot', chatRouter);

export default router;