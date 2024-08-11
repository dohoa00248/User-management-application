
import dbConnect from "../config/db.connect.js";

const insertUser = async (userData) => {
    try {
        const { username, password, role } = userData;

        const pool = await dbConnect.connectToMySQL();

        const query = "INSERT INTO USERS (username, password, role) VALUES (?, ?, ?)";

        let [user] = await pool.query(query, [username, password, role]);

        return user;
    } catch (error) {
        console.log("Failed to create user:", error.message);

        return null;
    }
}

const findUserById = async (userId) => {
    try {
        const { id } = userId;

        const pool = await dbConnect.connectToMySQL();

        const query = "SELECT * FROM USERS WHERE id = ?";

        let [userById, fields] = await pool.query(query, [id]);
        userById = userById && userById.length > 0 ? userById[0] : {};

        return userById;

    } catch (error) {
        console.error("Failed to find user by ID.", error.message);
        return {}
    }
}
const updateUserById = async (userId, userData) => {
    try {
        const { id } = userId;

        const pool = await dbConnect.connectToMySQL();

        const query = "UPDATE users SET username = ?, password = ?, role = ?, updatedAt = ? WHERE id = ?";

        const { username, password, role } = userData;

        let [updateUserResult] = await pool.query(query, [username, password, role, new Date(), id]);

        return updateUserResult;

    } catch (error) {
        console.log("Failed to update user.", error.message);
    }
}
const deleteUserById = async (userId) => {
    try {
        const { id } = userId;

        const pool = await dbConnect.connectToMySQL();

        const query = "DELETE FROM USERS WHERE id = ?";

        let [deleteUser] = await pool.query(query, [id]);

        return deleteUser;
    } catch (error) {
        console.log("Failed to delete user.", error.message);
    }

}

const findAllUsers = async () => {
    try {
        const pool = await dbConnect.connectToMySQL();

        const query = "SELECT * FROM users";

        let [users, fields] = await pool.query(query);

        return users;

    } catch (error) {
        console.error('Failed to retrieve user list.', error.message);
    }
}

export default {
    insertUser,
    findUserById,
    findAllUsers,
    updateUserById,
    deleteUserById
}