import { Router } from 'express';
import { login, loginAdminAuth, signup } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/admin/login", loginAdminAuth);

export default authRouter;