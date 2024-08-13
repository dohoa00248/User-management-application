// Using mysql

import userService from "../services/user.mysql.service.js";

const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const userData = { username, password, role };

        //c2 giảm tham số truyền vào
        // const userData = req.body;

        // console.log(userData);

        if (!userData.username || !userData.password || !userData.role) {
            return res.status(400).json({
                status: false,
                message: 'Missing required fields.',
                error: "Username or password required."
            });
        }

        // Tạo người dùng mới
        const user = await userService.insertUser(userData);
        console.log("User:", user);
        if (!user) {
            console.log("Failed to create user.");
            return res.status(400).json({
                status: false,
                message: "Failed to create user.",
                error: "Invalid or duplicate data.",
                user: {}
            });
        }

        else {
            console.log("User created successfully.");
            return res.status(201).json({
                status: true,
                message: "User created successfully.",
                user: user.affectedRows
            });
        }

    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({
            status: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        //Cú Pháp Truyền Tham Số Truy Vấn.
        const { id } = req.params;
        const userId = { id };
        // console.log("Check userId:", userId);
        // Gọi dịch vụ để lấy thông tin người dùng theo ID
        const userById = await userService.findUserById(userId);
        console.log("Check userById:", userById);

        if (!userById) {
            // Nếu không tìm thấy người dùng
            console.log("User not found.");
            return res.status(404).json({
                status: false,
                message: "User not found.",
                user: {}
            });
        }

        else {
            // Gửi phản hồi thành công với thông tin người dùng
            return res.status(200).json({
                status: false,
                message: "User found successfully.",
                user: userById
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Failed to get user by ID',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = { id };
        console.log(userId);

        const { password, firstName, lastName } = req.body;
        const userData = { password, firstName, lastName }
        //c2
        // const userData = req.body;

        console.log("Received userData:", userData);

        // Cập nhật người dùng theo ID
        const updateUserResult = await userService.updateUserById(userId, userData);

        console.log(updateUserResult);

        if (updateUserResult.changedRows === 0) {
            // Nếu không tìm thấy người dùng để cập nhật
            return res.status(400).json({
                status: false,
                message: "Failed to update user.",
                error: "Invalid or duplicate data or User not found.",
                user: {}
            });
        }

        // Gửi phản hồi thành công với thông tin người dùng đã cập nhật
        return res.status(200).json({
            status: true,
            message: "User updated successfully.",
            user: updateUserResult
        });

    } catch (error) {
        // Xử lý lỗi và gửi phản hồi lỗi
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = { id };

        //c2
        // const userId = req.params;
        console.log(userId);
        // Xóa người dùng theo ID
        const deleteUserResult = await userService.deleteUserById(userId);

        console.log(deleteUserResult);

        if (deleteUserResult.affectedRows === 0) {
            // Nếu không tìm thấy người dùng để xóa
            return res.status(404).json({
                status: false,
                message: "Failed to delete user.",
                error: "User not found."
            });
        }

        // Gửi phản hồi thành công
        return res.status(200).json({
            status: true,
            message: "User deleted successfully.",
            user: deleteUserResult
        });

    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({
            status: false,
            message: "Failed to delete user.",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Gọi dịch vụ để lấy tất cả người dùng
        const usersArr = await userService.findAllUsers();
        console.log("Check users:", usersArr);
        if (!usersArr || usersArr.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No users found.",
                users: []
            });
        }
        // Gửi phản hồi thành công với danh sách người dùng
        return res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            users: usersArr
        });

    } catch (error) {
        // Xử lý lỗi và gửi phản hồi lỗi
        return res.status(500).json({ status: false, message: 'Failed to retrieve user list', error: error.message });
    }
};

export default {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
}