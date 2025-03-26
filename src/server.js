// old
// const express = require("express");
// new
import express from "express";
import { configDotenv } from "dotenv";
import routes from "./routes/index.route.js";
import dbConnect from "./config/db.connect.js";
import configViewEngine from "./config/view.engine.js";
import methodOverride from "method-override";
const app = express();

// Load environment variables from .env file
configDotenv();
// console.log("Check env", process.env);

//config hostname, port for app
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || "localhost";

//config req.body midleware
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config viewEngine
configViewEngine(app);

app.use(methodOverride("_method")); // Để xử lý _method

//config routes
routes(app);

// app.get('/', (req, res) => {
//     res.send("Hello admin");
// })

//Connect to database
dbConnect.connectToMongoDB();
dbConnect.connectToMongoDBByMongoose();
dbConnect.connectToMySQL();
dbConnect.connectToMySQLBySequelize();
dbConnect.synchronizeModels();

app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});
