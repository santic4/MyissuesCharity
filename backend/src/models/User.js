import { DataTypes } from "sequelize"

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'donor'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "users",
      timestamps: false
    }
  );

  // Asociaciones
  User.associate = (models) => {
    User.hasMany(models.Donation, { foreignKey: 'user_id' });
    User.hasMany(models.SeniorInteraction, { foreignKey: 'senior_id', as: 'SeniorInteractions' });
    User.hasMany(models.SeniorInteraction, { foreignKey: 'agent_id', as: 'AgentInteractions' });
  };

  return User;
};