import { DataTypes } from "sequelize"

export default (sequelize) => {
    const Campaign = sequelize.define(
        "Campaign",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT
            },
            goal_amount: {
                type: DataTypes.DECIMAL(12,2),
                allowNull: false
            },
            collected_amount: {
                type: DataTypes.DECIMAL(12,2),
                defaultValue: 0
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "campaigns",
            timestamps: true,
            createdAt: "created_at",
        }
    )
    
    Campaign.associate = (models) => {
      Campaign.hasMany(models.Donation, { foreignKey: 'campaign_id' });
    };

  return Campaign;
};