import { DataTypes } from "sequelize"

export default (sequelize) => {
    const AdminUser = sequelize.define(
        "AdminUser",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING(50),
                unique: true,
                allowNull: false
            },
            password_hash: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            permissions: { 
                type: DataTypes.ARRAY(DataTypes.TEXT), 
                allowNull: false, 
                defaultValue: ['read', 'write', 'delete'] 
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: "admin_users",
            timestamps: false
        });
        
        return AdminUser;
    }