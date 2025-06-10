import { Router } from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.post("/register", registerAdmin);
adminRouter.get("/login", loginAdmin);

export default adminRouter;