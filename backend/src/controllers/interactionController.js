import { SeniorInteraction, User } from "../models/index.js";
import { createInteractionWithSenior, updateInteractionWithSenior } from "../services/chatbot/seniorInteraction.js";

export const getAllInteractions = async (req, res, next) => {
    try {
        const interactions = await SeniorInteraction.findAll({ order: [['interacted_at','DESC']] });
        if(!interactions) throw new Error('Interactions not found.')

        res.json(interactions);
    } catch (error) {
        next(error)
    }
}

export const createInteraction = async (req, res, next) => {    
    const { agent_id, summary } = req.body;
    const user = req.user;
    try {
        const senior_id = user.id;
        console.log(senior_id,'SENIORSENIOR',agent_id, summary)
        if(!agent_id || !summary ) throw new Error('Required fields are missing.')

        const response = await createInteractionWithSenior(senior_id, agent_id, summary)

        if(!response) throw new Error('Error in interactions')
        res.status(201).json(response);
    } catch (error) {
        next(error)
    }
}

export const updateInteraction = async (req, res, next) => {    
    const senior_id = req.user;
    try {
        const response = await updateInteractionWithSenior(senior_id)

        if(!response) throw new Error('Error in interactions')
        res.status(201).json();
    } catch (error) {
        next(error)
    }
}