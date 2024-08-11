// Hàm kết nối đến cơ sở dữ liệu
import sequelize from "./sequelize.js";
const connectToMySQLBySequelize = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to MySQL using Sequelize.");
        return sequelize;
    } catch (error) {
        console.error("Failed to connect to MySQL using Sequelize !.", error);
    }
};
export default connectToMySQLBySequelize;