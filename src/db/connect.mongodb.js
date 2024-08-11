import { MongoClient, ObjectId } from "mongodb";
const connectToMongoDB = async () => {
    try {
        const mongodbUrl = "mongodb://localhost:27017/"
        const mongoClient = new MongoClient(mongodbUrl);
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB.");
        return mongoClient;
    } catch (error) {
        console.log("Failed to connect to MongoDB !.", error)
    }
}
// connectToMongoDB();
export default connectToMongoDB;

