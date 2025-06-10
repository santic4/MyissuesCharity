import { DataTypes } from "sequelize"

export default (sequelize) => {
    const SeniorInteractionModel = sequelize.define(
        "SeniorInteraction",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            senior_id: { 
                type: DataTypes.INTEGER, 
                allowNull: false 
            },
            agent_id: { 
                type: DataTypes.INTEGER, 
                allowNull: false 
            },
            summary: { 
                type: DataTypes.TEXT 
            },
            status: { 
                type: DataTypes.STRING(50), 
                defaultValue: 'pending' 
            },
            interacted_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: "senior_interactions",
            timestamps: false
        });

        SeniorInteractionModel.associate = (models) => {
          SeniorInteractionModel.belongsTo(models.User, { foreignKey: 'senior_id', as: 'Senior' });
          SeniorInteractionModel.belongsTo(models.User, { foreignKey: 'agent_id', as: 'Agent' });
        };

        return SeniorInteractionModel;
    }