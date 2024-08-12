import User from "../models/user.sequelize.model.js";
import userService from "../services/user.sequelize.service.js";

const createUser = async (req, res) => {
    try {
        // Lấy dữ liệu người dùng từ body của request
        const { username, password } = req.body;
        const userData = { username, password };
        console.log("User data:", userData);

        // Kiểm tra xem username đã tồn tại chưa
        // const existingUser = await User.findOne({ where: { username } });
        // if (existingUser && existingUser.id !== id) {
        //     // Nếu có user khác với username này, báo lỗi cho client
        //     return res.status(400).json({
        //         status: false,
        //         message: "Username already exists",
        //     });
        // }
        // Kiểm tra xem userData có phải là đối tượng không và các trường bắt buộc có mặt
        if (!userData || typeof userData !== "object") {
            console.log("Invalid user data format.");
            return res.status(400).json({
                status: "error",
                message: "Invalid user data format.",
            });
        }

        // const { name, name_id, type, role, abc } = userData;
        // Kiểm tra các trường bắt buộc trong userData
        if (!userData.username || !userData.password) {
            console.log("Missing required fields.");
            return res.status(400).json({
                status: "error",
                message: "Missing required fields.",
            });
        }

        // Gọi service để tạo người dùng mới
        const user = await userService.createOneUser(userData);
        console.log("Check user:", user)
        // Kiểm tra nếu việc tạo người dùng không thành công
        if (!user) {
            console.log("Failed to create user.");
            return res.status(400).json({
                status: false,
                message: "Failed to create user.",
                user: {}
            });
        }

        // Trả về phản hồi thành công với thông tin người dùng mới
        return res.status(201).json({
            status: true,
            message: "User created successfully.",
            user: user.dataValues,
        });

    } catch (error) {
        console.log("Error creating user:", error.message);
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
        const userId = { id };
        console.log("Check id:", userId); ư

        const userById = await userService.findOneUserById(userId);

        if (!userById) {
            return res.status(400).json({
                status: false,
                message: "Failed to get user by ID.",
                error: "User not found."
            });
        }

        return res.status(200).json({
            status: true,
            message: "User found successfully.",
            userById: userById
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Id", id);
        const userId = { id };
        console.log(userId);

        const { username, password, role, firstName, lastName } = req.body;
        const userData = { username, password, role, firstName, lastName };

        const updateUserResult = await userService.upsertOneUser(userId, userData);
        console.log("Check updateUserResult:", updateUserResult);
        if (!updateUserResult) {
            return res.status(400).json({
                status: false,
                message: "Update user failed.",
                error: "User not found or invalid data.",
            });
        }
        else {
            return res.status(200).json({
                status: true,
                message: "Update user successfully",
                user: updateUserResult.dataValues,
            });
        }

    } catch (error) {
        console.log("Error updating User:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = { id };

        const deleteUserResult = await userService.destroyOneUser(userId);
        console.log("Check deleteUserById:", deleteUserResult);

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
            return res.status(200).json({
                status: true,
                message: "User deleted successfully",
                user: deleteUserResult,
            });
        }
    } catch (error) {

        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getAllUsers = async (req, res) => {
    try {

        //c1 destructuring
        // const query = "SELECT * FROM users";
        // const [users, metadata] = await sequelize.query(query);
        // console.log("List users:", users);
        // return users;

        //c2 SELECT query - no destructuring
        // const query = "SELECT * FROM users";
        // const users = await sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        // });
        // console.log("List users:", results);
        // return users;

        //c3 use Model.findAll({})
        // const users = await User.findAll({}); // Lấy danh sách tất cả người dùng từ cơ sở dữ liệu
        const usersArr = await userService.findAllUsers();
        console.log("List users:", usersArr); // In danh sách người dùng ra console
        if (!usersArr || usersArr.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No users found",
                users: []
            });
        }
        res.status(200).json({
            status: true,
            message: "Successfully retrieved users.",
            usersList: usersArr
        });
    } catch (error) {
        // console.log("Error:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export default {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
}


