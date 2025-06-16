
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
// console.log(process.env);
import { MongoClient } from 'mongodb';
const connectToMongoDB = async () => {
  try {
    // const mongodbUrl = "mongodb://localhost:27017";
    const mongodbUrl = process.env.DB_MONGODB_URL_HOST;
    const mongoClient = new MongoClient(mongodbUrl);
    await mongoClient.connect();
    const dbName = process.env.DB_MONGODB_NAME;
    const db = mongoClient.db(dbName);
    console.log('Successfully connected to MongoDB.');
    return db;
  } catch (error) {
    console.log('Failed to connect to MongoDB !.', error.message);
  }
};


const connectToMongoDBByMongoose = async () => {
  try {
    const mongodbUri = process.env.DB_MONGODB_URL;
    await mongoose.connect(mongodbUri);
    console.log('Successfully connected to MongoDB using Mongoose.');
  } catch (error) {
    console.log(
      'Failed to connect to MongoDB using Mongoose !.',
      error.message
    );
  }
};

import { pool } from './db.config.js';
const connectToMySQL = async () => {
  try {
    await pool.getConnection();
    console.log('Successfully connected to MySQL.');
    return pool;
  } catch (error) {
    console.log('Failed to connect to MySQL', error.message);
  }
};
// connectToMySQL();
import { sequelize } from './db.config.js';
const connectToMySQLBySequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to MySQL using Sequelize.');
    return sequelize;
  } catch (error) {
    console.log('Failed to connect to MySQL using Sequelize !.', error.message);
  }
};
const synchronizeModels = async () => {
  try {
    // Synchronize all defined models to the database
    await sequelize.sync({}); // Use { alter: true } to avoid dropping tables
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log('Error synchronizing models:', error.message);
  }
};

export default {
  connectToMongoDB,
  connectToMySQL,
  connectToMySQLBySequelize,
  connectToMongoDBByMongoose,
  synchronizeModels,
};
