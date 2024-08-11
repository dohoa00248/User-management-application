// new es6+
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from "path";
import path from "path";
//c1 node js js
// const dotenvPath = `C:\\Users\\Admin\\Desktop\\app-test-restfulapi\\.env`; // Adjust the path based on your project structure
// c2 window
// const dotenvPath = `C:/Users//Admin/Desktop/app-test-restfulapi/.env`; // Adjust the path based on your project structure
// console.log("Check env", process.env);
const __filename = fileURLToPath(import.meta.url);
// console.log("Check __filename", __filename);
const __dirname = dirname(__filename);
// console.log("Check __dirname", __dirname);
// Xây dựng đường dẫn tuyệt đối tới file .env
const dotenvPath = path.join(__dirname, '../../.env')
// console.log("Check dotenvPath", dotenvPath);
configDotenv({ path: dotenvPath });
const connectToMongoDBByMongoose = async () => {
    try {
        const mongodbUri = process.env.DB_MONGODB_URL;
        await mongoose.connect(mongodbUri);
        console.log("Successfully connected to MongoDB using Mongoose.");
    } catch (error) {
        console.log("Failed to connect to MySQL using Mongoose !.", error);
    }
}
// connectToMongoDBByMongoose();
export default connectToMongoDBByMongoose;

// old
// const mongoose = require("mongoose");
// const connectToMongoDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://admin:4BkAvOFMY7UeS2Rn@cluster0.7w5uepz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
//         console.log("Connected successfully !");
//     } catch (error) {
//         console.log("Connected fail !!!");
//     }
// }
// connectToMongoDB();
// module.exports = connectToMongoDB;