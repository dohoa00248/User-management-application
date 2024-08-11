import userService from "../services/user.mongodb.service.js";

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const { username, password } = userData;
        console.log(userData);

        if (!username || !password) {

            console.log("Username and password are required.");

            return res.status(400).json({

                status: false,
                message: "Invalid user data.",
                error: "Username and password are required."

            });
        }

        const user = await userService.insertOneUser(userData);

        if (!user) {
            console.log("Failed to create user:");
            return res.status(400).json({

                status: false,
                message: "Failed to create user.",
                user: {}

            });
        }
        else {

            console.log("User created successfully.");
            console.log("User:", user);

            return res.status(201).json({

                status: true,
                message: "User created successfully.",
                user: user

            });

        }

    } catch (error) {

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Check id:", id);
        const userById = await userService.findOneUserById(id);
        console.log("Check", userById);
        if (!userById) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                user: {}
            });
        }
        // Gửi phản hồi thành công với thông tin người dùng

        return res.status(200).json({
            status: true,
            message: "User found successfully.",
            user: userById
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to get user by ID',
            error: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params;
        console.log(userId);
        // const userObjetId = new ObjectId(id);
        const userData = req.body;
        console.log(userData);

        // const { username, password } = userData;

        if (!userData.username || !userData.password) {
            return res.status(400).json({
                status: false,
                message: "Invalid user data.",
                error: "Username and password are required."
            });
        }

        const updateUserResult = await userService.findOneUserAndUpdate(userId, userData);

        if (!updateUserResult) {
            return res.status(400).json({
                status: false,
                message: "Failed to update user or user not found.",
                user: {}
            });
        }

        else {
            console.log("Updated user:", user);

            return res.status(200).json({
                status: true,
                message: "User updated successfully.",
                user: updateUserResult
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params;

        const deleteUserResult = await userService.findOneUserAndDelete(userId)

        if (!deleteUserResult) {
            return res.status(404).json({
                status: false,
                message: "Failed to delete user.",
                error: "User not found."
            });
        }

        else {
            return res.status(200).json({
                status: true,
                message: "User deleted successfully.",
                user: deleteUserResult
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const usersArray = await userService.findUsersToArray();
        console.log("Users:", usersArray);
        if (!usersArray || usersArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No users found",
                users: []
            })
        }

        else {
            return res.status(200).json({
                status: true,
                message: "Users retrieved successfully",
                users: usersArray
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export default {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
}