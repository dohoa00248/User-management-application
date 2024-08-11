import { ObjectId } from "mongodb";
import dbConnect from "../config/db.connect.js";

const insertOneUser = async (userData) => {
    try {
        const { username, password, role } = userData;

        if (!username || !password) {
            return;
        }

        const db = await dbConnect.connectToMongoDB();
        const userCollection = db.collection("users");

        const user = await userCollection.insertOne({
            username,
            password,
            role
        });

        if (!user) {
            return;
        }

        return user;
    } catch (error) {
        console.log("Failed to create user.", error.message);
    }
}

const findOneUserById = async (id) => {
    try {
        const db = await dbConnect.connectToMongoDB();
        const userCollection = db.collection("users");

        const userIdObj = new ObjectId(id);
        const user = await userCollection.findOne({ _id: userIdObj });
        
        return user;
    } catch (error) {
        console.log("Failed to find user by ID.", error.message);
    }
}

const findOneUserAndUpdate = async (userId, userData) => {
    try {
        const { id } = userId;
        const userObjetId = new ObjectId(id);

        const { username, password, role } = userData;

        const db = await dbConnect.connectToMongoDB();
        const userCollection = db.collection("users");

        const newUserData = {
            $set: {
                username,
                password,
                role
            }
        }

        const updateUserResult = await userCollection.findOneAndUpdate(
            { _id: userObjetId },
            newUserData,
            { returnDocument: "after" }
        );

        return updateUserResult;
    } catch (error) {
        console.log("Failed to create user.", error.message);
    }
}

const findOneUserAndDelete = async (userId) => {
    try {
        const { id } = userId;
        const userObjetId = new ObjectId(id);

        const db = await dbConnect.connectToMongoDB();
        const userCollection = db.collection("users");

        const deleteUserResult = await userCollection.findOneAndDelete({ _id: userObjetId });

        if (!deleteUserResult) {
            return;
        }

        else {
            return deleteUserResult;
        }

    } catch (error) {
        console.log("Failed to delete user.", error.message);
    }
}

const findUsersToArray = async (req, res) => {
    try {
        const db = await dbConnect.connectToMongoDB();
        const userCollection = db.collection("users");

        // Lấy con trỏ FindCursor
        const usersCursor = userCollection.find();
        // Chuyển con trỏ sang mảng các tài liệu
        const usersArray = await usersCursor.toArray();

        //c2 nhanh
        // const users = await userCollection.find().toArray();

        if (!usersArray) {
            return;
        }

        else {
            return usersArray;
        }

    } catch (error) {
        console.log("No users found", error.message);
    }
}

export default {
    insertOneUser,
    findOneUserById,
    findOneUserAndUpdate,
    findOneUserAndDelete,
    findUsersToArray
}