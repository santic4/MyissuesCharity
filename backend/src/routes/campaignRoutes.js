import { Router } from 'express';
import { createCampaign, deleteCampaign, getAllCampaigns, getCampaignById, updateCampaign } from '../controllers/campaignController.js';
import { authenticateAdmin } from '../services/auth/authServices.js';

const campaignRouter = Router();

campaignRouter.get('/', getAllCampaigns);
campaignRouter.get('/:id', getCampaignById);
campaignRouter.post('/', authenticateAdmin, createCampaign);
campaignRouter.put('/:id', authenticateAdmin, updateCampaign);
campaignRouter.delete('/:id', authenticateAdmin, deleteCampaign);

export default campaignRouter;