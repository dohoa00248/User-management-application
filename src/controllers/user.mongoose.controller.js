import userService from '../services/user.mongoose.service.js';

const getHomeUserPage = async (req, res) => {
  // res.send("Hello user");
  const users = await userService.findAllUsers();
  return res.render('home.ejs', { userList: users });
};
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = { username, password };

    if (!username || !password) {
      return res.status(400).render('create-user.ejs', {
        error: 'Username and password are required.',
      });
    }

    const user = await userService.saveUser(userData);

    if (!user) {
      return res.status(400).render('create-user.ejs', {
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
    return res.status(500).render('create-user.ejs', {
      error: 'Internal Server Error.',
    });
  }
};
const getUserById = async (req, res) => {
  try {
    //c1
    const { id } = req.params;
    const userId = { id };
    console.log(userId);
    const userById = await userService.findUserById(userId);

    if (!userById) {
      console.log('User not found.');
      return res.status(404).json({
        status: false,
        message: 'User not found.',
        user: {},
      });
    } else {
      console.log('User found successfully.');
      console.log('User:', userById);
      return res.status(200).json({
        status: true,
        message: 'User found successfully.',
        user: userById,
      });
    }
  } catch (error) {
    console.log('Failed to find user by ID.', error.message);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = { id };

    const { password, firstName, lastName } = req.body;
    const userData = { password, firstName, lastName };

    const updateUserResult = await userService.findUserByIdAndUpdate(
      userId,
      userData
    );

    if (!updateUserResult) {
      console.log('Failed to update user.');
      return res.status(400).render('dashboard', {
        status: false,
        message: 'Failed to update user.',
        error: 'Invalid or duplicate data or User not found.',
        users: [],
      });
    }

    console.log('User updated successfully.');

    const allUsers = await userService.findAllUsers();
    res.render('dashboard', {
      status: true,
      message: 'User updated successfully.',
      userList: allUsers,
    });
  } catch (error) {
    res.status(500).render('dashboard', {
      status: false,
      message: 'Internal Server Error',
      error: error.message,
      userList: [],
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = { id };

    const deleteUserResult = await userService.findUserByIdAndDelete(userId);

    if (!deleteUserResult) {
      console.log('Failed to delete user or user not found.');
      return res.status(404).render('dashboard', {
        status: false,
        message: 'Failed to delete user.',
        error: 'User not found.',
        userList: [],
      });
    }

    console.log('User deleted successfully.');

    const allUsers = await userService.findAllUsers();
    return res.render('dashboard', {
      status: true,
      message: 'User deleted successfully.',
      userList: allUsers,
    });
  } catch (error) {
    res.status(500).render('dashboard', {
      status: false,
      message: 'Internal Server Error',
      error: error.message,
      userList: [],
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const usersArray = await userService.findAllUsers();
    console.log('Users:', usersArray);

    if (!usersArray || usersArray.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No users found',
        userList: [],
      });
    }

    res.status(200).json({
      status: true,
      message: 'Users retrieved successfully',
      userList: usersArray,
    });
  } catch (error) {
    console.log('Internal Server Error', error.message);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getUpdatePage = async (req, res) => {
  try {
    //c1
    const { id } = req.params;
    const userId = { id };
    console.log(userId);
    const userById = await userService.findUserById(userId);

    if (!userById) {
      console.log('User not found.');
      return res.status(404).json({
        status: false,
        message: 'User not found.',
        user: {},
      });
    } else {
      console.log('User found successfully.');
      console.log('User:', userById);
      return res.render('update-user', { user: userById });
      // return res.status(200).json({
      //     status: true,
      //     message: "User found successfully.",
      //     user: userById
      // });
    }
  } catch (error) {
    console.log('Failed to find user by ID.', error.message);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getDeletePage = async (req, res) => {
  try {
    //c1
    const { id } = req.params;
    const userId = { id };
    console.log(userId);
    const userById = await userService.findUserById(userId);

    if (!userById) {
      console.log('User not found.');
      return res.status(404).json({
        status: false,
        message: 'User not found.',
        user: {},
      });
    } else {
      console.log('User found successfully.');
      console.log('User:', userById);
      return res.render('delete-user', { user: userById });
      // return res.status(200).json({
      //     status: true,
      //     message: "User found successfully.",
      //     user: userById
      // });
    }
  } catch (error) {
    console.log('Failed to find user by ID.', error.message);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export default {
  getHomeUserPage,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  getUpdatePage,
  getDeletePage,
};
