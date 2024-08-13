
import dbConnect from "../config/db.connect.js";

const insertUser = async (userData) => {
    try {
        const { username, password, role } = userData;

        const pool = await dbConnect.connectToMySQL();

        const query = "INSERT INTO USERS (username, password, role) VALUES (?, ?, ?)";

        const [user] = await pool.query(query, [username, password, role]);

        return user;
    } catch (error) {
        console.log("Failed to create user:", error.message);
    }
}

const findUserById = async (userId) => {
    try {
        const { id } = userId;

        const pool = await dbConnect.connectToMySQL();

        const query = "SELECT * FROM USERS WHERE id = ?";

        let [userById, fields] = await pool.query(query, [id]);
        console.log("Check userById:", userById);
        userById = userById && userById.length > 0 ? userById[0] : {};
        console.log("Check userById[0]:", userById);
        return userById;

    } catch (error) {
        console.error("Failed to find user by ID.", error.message);
    }
}
const updateUserById = async (userId, userData) => {
    try {
        const { id } = userId;

        const pool = await dbConnect.connectToMySQL();

        const query = "UPDATE users SET password = ?, firstName = ?,  lastName = ?, updatedAt = ? WHERE id = ?";

        const { password, firstName, lastName } = userData;

        const [updateUserResult] = await pool.query(query, [password, firstName, lastName, new Date(), id]);

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

        const [deleteUser] = await pool.query(query, [id]);

        return deleteUser;
    } catch (error) {
        console.log("Failed to delete user.", error.message);
    }

}

const findAllUsers = async () => {
    try {
        const pool = await dbConnect.connectToMySQL();

        const query = "SELECT * FROM users";

        const [users, fields] = await pool.query(query);
        console.log(users);
        return users;

    } catch (error) {
        console.error('Failed to retrieve user list.', error.message);
    }
}

export default {
    insertUser,
    findUserById,
    updateUserById,
    deleteUserById,
    findAllUsers
}