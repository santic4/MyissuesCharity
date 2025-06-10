import { AdminUser } from "../../models/index.js";

export const getAdmin = async (email) => {

    if (!email) {
      throw new Error('Email no proporcionado');
    }

    const admin = await AdminUser.findOne({ where: { email } });

    return admin;
};
