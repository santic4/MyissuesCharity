import { Router } from 'express';
import { createInteraction, getAllInteractions, updateInteraction } from '../controllers/interactionController.js';
import { authenticate, authenticateAdmin } from '../services/auth/authServices.js';

const interactionRouter = Router();

interactionRouter.get("/", authenticateAdmin, getAllInteractions);
interactionRouter.post("/", authenticate, createInteraction);
interactionRouter.put("/", authenticate, updateInteraction);

export default interactionRouter;