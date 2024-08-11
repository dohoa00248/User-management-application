import userService from "../services/user.mongoose.service.js";

const getUserPage = async (req, res) => {
    res.send("Hello user");
}
const createUser = async (req, res) => {
    //c1
    try {
        const userData = req.body;
        console.log(userData);

        if (!userData.username || !userData.password) {
            console.log("Username and password are required.");
            return res.status(400).json({
                status: false,
                message: "Invalid user data.",
                error: "Username and password are required."
            });
        }
        // lỗi 500 dành cho nội bộ
        const user = await userService.saveUser(userData);

        if (!user) {
            console.log("Failed to create user.");
            return res.status(400).json({
                status: false,
                message: "Failed to create user.",
                user: {}
            });
        }
        else {
            console.log("User created successfully.");
            console.log("User created:", user);
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
        //c1
        const userId = req.params; // Sử dụng req.params thay vì req.body vì ID được truyền qua URL
        console.log(userId);
        //c2
        // const id = req.params.id;
        // const user = await User.findById(id);
        const userById = await userService.findUserById(userId);

        if (!userById) {
            // console.log("User not found.");
            return res.status(404).json({
                status: false,
                message: "User not found.",
                user: {}
            });
        }
        else {
            // console.log("User found successfully.");
            // console.log("User:", userById);
            return res.status(200).json({
                status: true,
                message: "User found successfully.",
                user: userById
            });
        }
    } catch (error) {
        console.log("Failed to find user by ID.", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }

}
const updateUser = async (req, res) => {
    try {
        const userId = req.params;
        const userData = req.body;
        console.log(userData);
        const updateUserResult = await userService.findUserByIdAndUpdate(userId, userData);

        if (!updateUserResult) {
            console.log("Failed to update user or user not found.");
            return res.status(400).json({
                status: false,
                message: "Failed to update user or user not found.",
                user: {}
            });
        }

        console.log("User updated successfully.");
        return res.status(200).json({
            status: true,
            message: "User updated successfully.",
            user: updateUserResult
        });

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

        const deleteUserResult = await userService.findUserByIdAndDelete(userId);

        if (!deleteUserResult) {
            console.log("Failed to delete user or user not found.");
            return res.status(404).json({
                status: false,
                message: "Failed to delete user.",
                error: "User not found."
            });
        }

        else {
            console.log("User deleted successfully.");
            res.status(200).json({
                status: true,
                message: "User deleted successfully.",
                user: deleteUserResult
            });
        }
    } catch (error) {
        // console.log("Error:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const usersArray = await userService.findAllUsers();
        console.log("Users:", usersArray);
        if (!usersArray || usersArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No users found",
                users: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            users: usersArray
        });

    } catch (error) {

        console.log("Internal Server Error", error.message);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export default {
    getUserPage,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
}
