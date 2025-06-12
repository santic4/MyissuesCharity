import { Router } from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get("/login", loginAdmin);

export default adminRouter;