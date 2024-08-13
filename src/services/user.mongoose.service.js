
import User from "../models/user.mongoose.model.js";
const saveUser = async (userData) => {
    try {
        const { username, password, role, firstName, lastName } = userData;

        if (!username || !password) {
            return;
        }

        else {
            const newUser = new User({ username, password, role, firstName, lastName });
            const saveUser = await newUser.save();

            if (!saveUser) {
                return;
            }

            else {
                return saveUser;
            }
        }

    } catch (error) {
        console.log("Failed to create user.", error.message);
    }
}
const findUserById = async (userId) => {
    try {
        const { id } = userId;
        const userById = await User.findById(id);

        if (!userById) {
            return;
        }

        else {
            return userById;
        }
    } catch (error) {
        console.log("Failed to find user by ID.", error.message);
    }
}
const findUserByIdAndUpdate = async (userId, userData) => {
    try {
        const { id } = userId;
        const { password, firstName, lastName } = userData;
        const updateUserResult = await User.findByIdAndUpdate(id, { password, firstName, lastName }, { new: true });

        if (!updateUserResult) {
            return;
        }

        else {
            return updateUserResult;
        }

    } catch (error) {
        console.log("Failed to update user.", error.message);
    }
}
const findUserByIdAndDelete = async (userId) => {
    try {
        const { id } = userId;
        const deleteUserResult = await User.findByIdAndDelete(id);
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
const findAllUsers = async (req, res) => {
    try {
        const usersArray = await User.find({});

        if (!usersArray) {
            return;
        }

        else {
            return usersArray;
        }

    } catch (error) {
        console.log("Failed to retrieve user list.", error.message);
    }
}
export default {
    saveUser,
    findUserById,
    findUserByIdAndUpdate,
    findUserByIdAndDelete,
    findAllUsers
}