import User from "../models/user.sequelize.model.js";

// tao nguoi dung
// Example function to create a new record in the database
const createOneUser = async (userData) => {
    try {
        const { username, password } = userData;
        if (!username || !password) {
            console.log("Missing required fields.");
            return;
        }
        const user = await User.create({
            username,
            password,
        });
        console.log("Checking user:", user);
        return user;

    } catch (error) {
        console.log("Failed to create user.", error.message);
    }

}

const findOneUserById = async (userId) => {
    try {
        const { id } = userId;

        const userById = await User.findOne({
            where: {
                id: id
            }
        });
        // const userById = await User.findByPk(id);

        console.log("Check userById:", userById);
        return userById;

    } catch (error) {
        console.log("Failed to get userById:", error.message);
    }
}

// update ng dung
const upsertOneUser = async (userId, userData) => {
    try {
        const { id } = userId;

        const { username, password, role, firstName, lastName } = userData;

        const [updateUserResult] = await User.upsert({
            id: id,
            username: username,
            password: password,
            role: role,
            firstName: firstName,
            lastName: lastName,
            updatedAt: new Date(),
        })

        return updateUserResult;

    } catch (error) {
        console.log("Error updating User:", error.message);

    }
}


// // xoa ng dung
const destroyOneUser = async (userId) => {
    try {
        // const { id } = userId;
        const deleteUserResult = await User.destroy({
            where: {
                id: userId
            }
        })

        if (deleteUserResult === 0) {
            return;
        }

        else {
            return deleteUserResult;
        }

    } catch (error) {
        console.log("Internal server error.", error.message)
    }
}

// // lay danh sach ng dung
const findAllUsers = async () => {
    try {
        //c3 use Model.findAll({})
        const users = await User.findAll({}); // Lấy danh sách tất cả người dùng từ cơ sở dữ liệu
        console.log("Check users:", users);
        const usersArr = users.map(user => user.dataValues);

        return usersArr; // Trả về danh sách người dùng
    } catch (error) {
        console.log("Error:", error.message);
    }
}

export default {
    createOneUser,
    findOneUserById,
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
