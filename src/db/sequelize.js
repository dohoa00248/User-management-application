import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Cấu hình đường dẫn đến file .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dotenvPath = path.join(__dirname, '../../.env');
configDotenv({ path: dotenvPath });

// Khởi tạo đối tượng Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Tắt logging nếu không cần
});
export default sequelize;

const connectToMySQLBySequelize = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to MySQL using Sequelize.");
        return sequelize;
    } catch (error) {
        console.log("Failed to connect to MySQL using Sequelize !.", error.message);
    }
};

