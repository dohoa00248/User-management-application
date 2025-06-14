import userService from '../services/user.mongodb.service.js';

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = { username, password };

    if (!username || !password) {
      return res.status(400).render('create.user.mongoose', {
        error: 'Username and password are required.',
      });
    }

    const user = await userService.saveUser(userData);

    if (!user) {
      return res.status(400).render('create.user.mongoose', {
        error: 'Failed to create user. Maybe username already exists.',
      });
    }

    const users = await userService.getAllUsers(); // ⬅️ lấy danh sách users mới

    return res.status(201).render('dashboard', {
      users,
      message: 'User created successfully.', // tùy ý thêm
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).render('create.user.mongoose', {
      error: 'Internal Server Error.',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Check id:', id);
    const userId = { id };

    const userById = await userService.findOneUserById(userId);
    console.log('Check', userById);

    if (!userById) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
        user: {},
      });
    }
    // Gửi phản hồi thành công với thông tin người dùng

    return res.status(200).json({
      status: true,
      message: 'User found successfully.',
      user: userById,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Failed to get user by ID',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = { id };
    console.log(userId);

    const { username, password, role, firstName, lastName } = req.body;

    const userData = { username, password, role, firstName, lastName };
    console.log(userData);
    if (!userData.username || !userData.password) {
      return res.status(400).json({
        status: false,
        message: 'Invalid user data.',
        error: 'Username and password are required.',
      });
    }

    const updateUserResult = await userService.findOneUserAndUpdate(
      userId,
      userData
    );

    if (!updateUserResult) {
      console.log('Failed to update user.');
      return res.status(400).json({
        status: false,
        message: 'Failed to update user.',
        error: 'Invalid or duplicate data or User not found.',
        user: {},
      });
    } else {
      console.log('Updated user:', updateUserResult);

      return res.status(200).json({
        status: true,
        message: 'User updated successfully.',
        user: updateUserResult,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = { id };

    const deleteUserResult = await userService.findOneUserAndDelete(userId);

    if (!deleteUserResult) {
      return res.status(404).json({
        status: false,
        message: 'Failed to delete user.',
        error: 'User not found.',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'User deleted successfully.',
        user: deleteUserResult,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersArray = await userService.findUsersToArray();
    console.log('Users:', usersArray);
    if (!usersArray || usersArray.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No users found',
        users: [],
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Users retrieved successfully',
        users: usersArray,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
