import { SeniorInteraction } from "../../models/index.js";

export const createInteractionWithSenior = async (senior_id, agent_id, summary) => {

    const interaction = await SeniorInteraction.create({
        senior_id: Number(senior_id),
        agent_id: Number(agent_id),
        summary: String(summary) || "",
    });

    return interaction;
};

export const updateInteractionWithSenior = async (id) => {
    const res = await SeniorInteraction.findByIdAndUpdate(id, { status: 'completed' }, { new: true });

    return res;
};

export const list = async (filters) => {
    const res = await SeniorInteraction.find(filters);

    return res;
};
