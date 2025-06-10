import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, NODE_ENV } from "../config/config.js";
import { Sequelize } from 'sequelize';
import UserModel from './User.js';
import CampaignModel from './Campaign.js';
import DonationModel from './Donation.js';
import AdminUserModel from './AdminUser.js';
import SeniorInteractionModel from "./SeniorInteraction.js";

const sequelize = new Sequelize(
  String(DB_NAME),
  String(DB_USER),
  DB_PASS,
  {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: "postgres",
    logging: console.log,
  }
);

// Carga los modelos
const User = UserModel(sequelize);
const Campaign = CampaignModel(sequelize);
const Donation = DonationModel(sequelize);
const SeniorInteraction = SeniorInteractionModel(sequelize);
const AdminUser = AdminUserModel(sequelize);

// Agrega todos los modelos a un objeto para iterar sobre associations
const models = { User, Campaign, Donation, SeniorInteraction, AdminUser };

Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

export {
  sequelize,
  User,
  Campaign,
  Donation,
  SeniorInteraction,
  AdminUser
};
