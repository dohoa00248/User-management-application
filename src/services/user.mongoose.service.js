import User from '../models/user.mongoose.model.js';
import bcrypt from 'bcryptjs';
const saveUser = async (userData) => {
  try {
    const { username, password, role, firstName, lastName } = userData;

    if (!username || !password) {
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });

    const savedUser = await newUser.save();

    return savedUser || null;
  } catch (error) {
    console.log('Failed to create user.', error.message);
  }
};
const findUserById = async (userId) => {
  try {
    const { id } = userId;
    const userById = await User.findById(id);

    if (!userById) {
      return;
    } else {
      return userById;
    }
  } catch (error) {
    console.log('Failed to find user by ID.', error.message);
  }
};
const findUserByIdAndUpdate = async (userId, userData) => {
  try {
    const { id } = userId;
    let { password, firstName, lastName } = userData;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const updateFields = {
      firstName,
      lastName,
    };

    if (password) {
      updateFields.password = password;
    }

    const updateUserResult = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return updateUserResult || null;
  } catch (error) {
    console.log('Failed to update user.', error.message);
  }
};
const findUserByIdAndDelete = async (userId) => {
  try {
    const { id } = userId;
    const deleteUserResult = await User.findByIdAndDelete(id);
    if (!deleteUserResult) {
      return;
    } else {
      return deleteUserResult;
    }
  } catch (error) {
    console.log('Failed to delete user.', error.message);
  }
};
const findAllUsers = async (req, res) => {
  try {
    const usersArray = await User.find({});

    if (!usersArray) {
      return;
    } else {
      return usersArray;
    }
  } catch (error) {
    console.log('Failed to retrieve user list.', error.message);
  }
};
export default {
  saveUser,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
  findAllUsers,
};
