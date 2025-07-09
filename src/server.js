// old
// const express = require("express");
// new
import express from 'express';
import { configDotenv } from 'dotenv';
import routes from './routes/index.route.js';
import dbConnect from './config/db.connect.js';
import configViewEngine from './config/view.engine.js';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
const app = express();

// Load environment variables from .env file
configDotenv();
// console.log("Check env", process.env);

//config hostname, port for app
const port = process.env.PORT || 3000;

//config req.body midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_MONGODB_URL,
      ttl: 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

//config viewEngine
configViewEngine(app);

app.use(methodOverride('_method'));

//config routes
routes(app);

// app.get('/', (req, res) => {
//     res.send("Hello admin");
// })

//Connect to databasea
// dbConnect.connectToMongoDB();
dbConnect.connectToMongoDBByMongoose();
// dbConnect.connectToMySQL();
// dbConnect.connectToMySQLBySequelize();
// dbConnect.synchronizeModels();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
