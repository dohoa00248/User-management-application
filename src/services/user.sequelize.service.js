import User from "../models/user.sequelize.model.js";
// import { sequelize } from "../config/db.config.js";

// dong bo tạo bang
// const synchronizeModels = async () => {
//     try {
//         // Synchronize all defined models to the database
//         await sequelize.sync(); // Use { alter: true } to avoid dropping tables
//         console.log('All models were synchronized successfully.');
//     } catch (error) {
//         console.log('Error synchronizing models:', error.message);
//     }
// }
// synchronizeModels();

// tao nguoi dung
// Example function to create a new record in the database
const createOneUser = async (userData) => {
    try {
        const { username, password } = userData;
        // if (!username || !password) {
        //     console.log("Missing required fields.");
        //     return;
        // }
        const user = await User.create({
            username,
            password,

        });

        return user.dataValues;

    } catch (error) {
        console.log("Failed to create user1.", error.message);

    }

}
// createUser();

// // lay danh sach ng dung
const findAllUsers = async () => {
    try {
        //By default, the function will return two arguments: an array of results, and a metadata object, containing number of affected rows etc.
        //Use const [results, meta] = await ... to access the results.

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

        // const userDataValues = users.map(user => user.dataValues);
        // console.log("List users:", userDataValues); // In danh sách người dùng ra console
        return users; // Trả về danh sách người dùng
    } catch (error) {
        console.log("Error:", error.message);
    }
}
// getAllUsers();

// update ng dung
const upsertOneUser = async () => {
    try {
        const [updateUserById] = await User.upsert({
            id: 1,
            name: "1123",
            name_id: 2,
            type: 33333,
            role: 4,
            abc: "1",
            updatedAt: new Date()
        })
        console.log("Check updateUserById:", updateUserById.dataValues);
        if (!updateUserById.dataValues) {
            console.log("User not found !.");
        }
        else {
            console.log("User updated successfully.");

        }
        return updateUserById;
    } catch (error) {
        console.log("Failed to update user.", error.message);
    }
}
// updateUser();

// // xoa ng dung
const destroyOneUser = async () => {
    try {
        const deleteUserById = await User.destroy({
            where: {
                id: 1
            }
        })
        console.log("Check deleteUserById:", deleteUserById);
        if (!deleteUserById) {
            console.log("User not found !.");
        }
        else {
            console.log("User deleted successfully.");

        }
        return deleteUserById;
    } catch (error) {
        console.log("Failed to delete user.", error.message);
    }
}
// deleteUser()

export default {
    createOneUser,
    findAllUsers,
    upsertOneUser,
    destroyOneUser,
}





// import User from "../models/userMysqlSequelize.js";

// // Tạo người dùng mới
// const createUser = async (userData) => {
//     try {
//         if (!userData || typeof userData !== 'object') {
//             throw new Error('Invalid user data');
//         }
//         const { name, name_id, type, role, abc } = userData;
//         if (!name || !name_id || !type || !role || !abc) {
//             throw new Error('Missing required fields');
//         }
//         const user = await User.create({ name, name_id, type, role, abc });
//         return user.dataValues;
//     } catch (error) {
//         throw new Error('Failed to create user: ' + error.message);
//     }
// }

// // Lấy người dùng theo ID
// const getUserById = async (id) => {
//     try {
//         const user = await User.findOne({ where: { id } });
//         if (!user) {
//             throw new Error('User not found');
//         }
//         return user.dataValues;
//     } catch (error) {
//         throw new Error('Failed to get user: ' + error.message);
//     }
// }

// // Lấy tất cả người dùng
// const getAllUsers = async () => {
//     try {
//         const users = await User.findAll({});
//         return users.map(user => user.dataValues);
//     } catch (error) {
//         throw new Error('Failed to get users: ' + error.message);
//     }
// }

// // Cập nhật người dùng
// const updateUser = async (id, userData) => {
//     try {
//         const { name, name_id, type, role, abc } = userData;
//         const [affectedRows] = await User.upsert({
//             id,
//             name,
//             name_id,
//             type,
//             role,
//             abc,
//             updatedAt: new Date()
//         });
//         if (affectedRows === 0) {
//             throw new Error('User not found');
//         }
//         return { id, name, name_id, type, role, abc };
//     } catch (error) {
//         throw new Error('Failed to update user: ' + error.message);
//     }
// }

// // Xóa người dùng
// const deleteUser = async (id) => {
//     try {
//         const deletedRows = await User.destroy({ where: { id } });
//         if (deletedRows === 0) {
//             throw new Error('User not found');
//         }
//         return { id };
//     } catch (error) {
//         throw new Error('Failed to delete user: ' + error.message);
//     }
// }

// export default {
//     createUser,
//     getUserById,
//     getAllUsers,
//     updateUser,
//     deleteUser
// }
