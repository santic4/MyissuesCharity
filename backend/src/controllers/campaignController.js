import { Campaign } from "../models/index.js";

export const getAllCampaigns = async (req, res, next) => {
    try {
        console.log('ASCDASDCSADCASDCASDc')
        const campaigns = await Campaign.findAll({ order: [["create_at", "ASC"]]});

        console.log(campaigns, 'ASCDASDCSADCASDCASDccampaigns')
        res.json(campaigns);
    } catch (error) {
        next(error)
    }
}

export const getCampaignById = async (req, res, next) => {    
    const id = parseInt(req.params.id);

    try {
        const camp = await Campaign.findByPk(id);

        res.json(camp);
    } catch (error) {
        next(error)
    }
}

export const createCampaign = async (req, res, next) => {    
    const { title, description, goal_amount } = req.body;
    try {
        if(!title || !goal_amount || !description) throw new Error('Data Invalid.')

        const newCamp = await Campaign.create({
            title,
            description,
            goal_amount,
            collected_amount: 0
        });

        if(!newCamp) throw new Error('Error to create campaign.')

        res.status(201).json(newCamp);
    } catch (error) {
        next(error)
    }
}

export const updateCampaign = async (req, res, next) => {    
    const id = parseInt(req.params.id);
    const { title, description, goal_amount } = req.body;
    try {
        const camp = await Campaign.findByPk(id);

        if(!camp) throw new Error('Campaign not found.')
 
        camp.title = title ?? camp.title;
        camp.description = description ?? camp.description;
        camp.goal_amount  = goal_amount ?? camp.goal_amount;

        await camp.save();
        res.json(camp);
    } catch (error) {
        next(error)
    }
}

export const deleteCampaign = async (req, res, next) => {    
    const id = parseInt(req.params.id);
    try {
        if(!id) throw new Error ("Data invalid.")
        const rowsDeleted = await Campaign.destroy({ where: { id } });

        if(rowsDeleted === 0) throw new Error('Campaign not found.')
        res.json({ message: "Campaign deleted." });
    } catch (error) {
        next(error)
    }
}