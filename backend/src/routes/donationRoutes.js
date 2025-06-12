import { Router } from 'express';
import { postDonation, getAllDonation } from '../controllers/donationController.js';
import { authenticate, authenticateAdmin } from '../services/auth/authServices.js';

const donationRouter = Router();

donationRouter.get("/", authenticateAdmin ,getAllDonation);
donationRouter.post("/", authenticate ,postDonation);

export default donationRouter;