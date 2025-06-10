import { Router } from 'express';
import { postDonation, getAllDonation } from '../controllers/donationController.js';
import { authenticate } from '../services/auth/authServices.js';

const donationRouter = Router();

donationRouter.get("/", getAllDonation);
donationRouter.post("/", authenticate ,postDonation);

export default donationRouter;