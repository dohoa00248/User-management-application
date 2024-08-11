import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

//c1 
//config đưa tên file name đang đứng -> url
const __filename = fileURLToPath(import.meta.url)
// console.log(__filename);
// get name_url chứa file đó
const __dirname = dirname(__filename);
// console.log(__dirname);
//config đường dẫn đến file .env
const dotenvPath = path.join(__dirname, "../../.env");

configDotenv({ path: dotenvPath });

//c2
// configDotenv({ path: '../../.env' });

import mysql2 from "mysql2/promise";
// Tạo pool kết nối với MySQL
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

import { Sequelize } from 'sequelize';
// Khởi tạo đối tượng Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Tắt logging nếu không cần
});

export {
    pool,
    sequelize,
}