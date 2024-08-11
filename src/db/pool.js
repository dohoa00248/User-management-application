import mysql2 from "mysql2/promise";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

//c1 
//config đưa tên file name đang đứng -> url
const __filename = fileURLToPath(import.meta.url)
// console.log(__filename);
// get name_url chứa file đó
const __dirname = dirname(__filename);
// console.log(__dirname);
//config đường dẫn đến file .env
const dotenvPath = path.join(__dirname, '../../.env');
configDotenv({ path: dotenvPath });

//c2
// configDotenv({ path: '../../.env' });

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
const connectToMySQL = async () => {
    try {
        await pool.getConnection();
        console.log("Successfully connected to MySQL.");
        return pool;
    } catch (error) {
        console.log("Failed to connect to MySQL", error.message);
    }
};





