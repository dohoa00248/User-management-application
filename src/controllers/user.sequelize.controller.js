import User from "../models/user.sequelize.model.js";
import userService from "../services/user.sequelize.service.js";

const createUser = async (req, res) => {
    try {
        // Lấy dữ liệu người dùng từ body của request
        const userData = req.body;
        console.log("User data:", userData);

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
        const user = await userService.createUser(userData);

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
            status: "success",
            message: "User created successfully.",
            user: user,
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
        console.log("Check id:", id);
        let userById = await User.findOne({
            where: {
                id: id
            }
        })
        console.log("Check userById:", userById.dataValues);

        if (!userById.dataValues) {
            res.status(400).json({
                status: false,
                message: "Failed to delete user.",
                error: "User not found."
            });
        }
        res.status(200).json({
            status: true,
            message: "User deleted successfully.",
            userById: userById.dataValues
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
        const { username, password, role } = req.body;
        const updateUserById = await User.upsert({
            id: id,
            username: username,
            password: password,
            role: role,
            updatedAt: new Date()
        })
        console.log("Check updateUserById:", updateUserById);
        const updatedUser = updateUserById && updateUserById.length > 0 ? updateUserById[0].dataValues : {};
        console.log("Check updatedUser:", updatedUser);
        if (!updatedUser) {
            // console.log("Error:", error.message);
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ status: "Update user successfully", user: updatedUser });
    } catch (error) {
        // console.log("Error updating User:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUserResult = await User.destroy({
            where: {
                id: id
            }
        })

        console.log("Check deleteUserById:", deletedUserResult);

        if (deletedUserResult === 0) {
            return res.status(404).json({
                status: false,
                message: "Failed to delete user.",
                error: "User not found."
            });
        }

        else {

            return res.status(200).json({
                status: true,
                message: "User deleted successfully",
                user: deletedUserResult
            });
        }
        // return deleteUserById;
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
        const users = await User.findAll({}); // Lấy danh sách tất cả người dùng từ cơ sở dữ liệu
        console.log("Check users:", users);
        const userDataValues = users.map(user => user.dataValues);
        console.log("List users:", userDataValues); // In danh sách người dùng ra console
        res.status(200).json({ status: "Successfully", users: userDataValues });
        // res.status(200).json(userDataValues);
        return users; // Trả về danh sách người dùng
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


