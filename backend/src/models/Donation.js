import { DataTypes } from "sequelize"

export default (sequelize) => {
    const Donation = sequelize.define(
        "Donation",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            campaign_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            amount: {
                type: DataTypes.DECIMAL(12,2),
                allowNull: false
            },
            payment_method: {
                type: DataTypes.STRING(50) 
            },
            transaction_id: { 
                type: DataTypes.STRING(100) 
            },
            donated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: "donations",
            timestamps: false
        })

      Donation.associate = (models) => {
        Donation.belongsTo(models.User, { foreignKey: 'user_id' });
        Donation.belongsTo(models.Campaign, { foreignKey: 'campaign_id' });
      };

      return Donation;
    }