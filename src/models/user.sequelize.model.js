import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

// Định nghĩa mô hình User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,  // 2: user, 1: admin
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    }

}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['username']
        }
    ]
});

export default User;

// dong bo tạo bang
const synchronizeModels = async () => {
    try {
        // Synchronize all defined models to the database
        await sequelize.sync({ alter: true }); // Use { alter: true } to avoid dropping tables
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error.message);
    }
}

synchronizeModels();
