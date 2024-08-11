// Using mysql

import userService from "../services/user-mysql.js";

const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Kiểm tra các trường bắt buộc
        if (!userData.name || !userData.type || !userData.name_id || !userData.role) {
            return res.status(400).json({ status: false, message: 'Missing required fields.' });
        }

        // Tạo người dùng mới
        const user = await userService.createUser(userData);

        // Gửi phản hồi thành công
        return res.status(201).json({ status: true, message: 'User created successfully', user: user });

    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({ status: false, message: 'Failed to create user', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Gọi dịch vụ để lấy tất cả người dùng
        const users = await userService.getAllUsers();

        // Gửi phản hồi thành công với danh sách người dùng
        return res.status(200).json({ status: true, users });

    } catch (error) {
        // Xử lý lỗi và gửi phản hồi lỗi
        return res.status(500).json({ status: false, message: 'Failed to retrieve user list', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Gọi dịch vụ để lấy thông tin người dùng theo ID
        const userById = await userService.getUserById(userId);

        if (!userById) {
            // Nếu không tìm thấy người dùng
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Gửi phản hồi thành công với thông tin người dùng
        return res.status(200).json({ status: true, user: userById });

    } catch (error) {
        return res.status(500).json({ status: false, message: 'Failed to get user by ID', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        // console.log("Received userData:", userData);

        // Cập nhật người dùng theo ID
        const updatedUser = await userService.updateUserById(userId, userData);

        if (!updatedUser) {
            // Nếu không tìm thấy người dùng để cập nhật
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Gửi phản hồi thành công với thông tin người dùng đã cập nhật
        return res.status(200).json({ status: true, message: "User updated successfully", user: updatedUser });

    } catch (error) {
        // Xử lý lỗi và gửi phản hồi lỗi
        return res.status(500).json({ status: false, message: "Failed to update user", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Xóa người dùng theo ID
        const deletedUser = await userService.deleteUserById(userId);

        if (!deletedUser) {
            // Nếu không tìm thấy người dùng để xóa
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Gửi phản hồi thành công
        return res.status(200).json({ status: true, message: "User deleted successfully", user: deletedUser });

    } catch (error) {
        // Xử lý lỗi
        console.error('Error in deleteUser controller:', error.message);
        return res.status(500).json({ status: false, message: "Failed to delete user", error: error.message });
    }
};


export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}