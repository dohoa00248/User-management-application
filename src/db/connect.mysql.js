// import pool from "../../pool.js";
import pool from "./pool.js";
const connectToMySQL = async () => {
    try {
        await pool.getConnection();
        console.log("Successfully connected to MySQL.");
        return pool;
    } catch (error) {
        console.error("Failed to connect to MySQL", error);
    }
};
// connectToMySQL();
export default connectToMySQL;