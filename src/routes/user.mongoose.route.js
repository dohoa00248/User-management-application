// old
// const express = require("express");
// const router = express.Router();
// router.get('/', (req, res) => {
//     res.send("Hello world");
// })
// module.exports = router;

// Using mongoose

// new es(2017)
import express from 'express';
import userController from '../controllers/user.mongoose.controller.js';
import auth from '../middlewares/auth.js';
import userService from '../services/user.mongoose.service.js';
import User from '../models/user.mongoose.model.js';
const router = express.Router();

router.get('/', userController.getHomeUserPage);

// router.get("/", async (req, res) => {
//     // res.send("Hello! userpage12");
//     const users = await userService.findAllUsers();
//     return res.render("home.ejs", { userList: users });
// })

router.post('/create', auth.authSignin, userController.createUser);
router.get('/create-user', auth.authSignin, (req, res) => {
  return res.render('create-user');
});

router.get('/users/search', auth.authSignin, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).render('dashboard', {
        error: 'Please enter a search term.',
        user: req.session.user,
        userList: await User.find(),
      });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });

    res.render('dashboard', {
      user: req.session.user,
      userList: users,
      success: `Found ${users.length} user(s) matching "${query}"`,
    });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).render('dashboard', {
      error: 'Internal server error',
      user: req.session.user,
      userList: await User.find(),
    });
  }
});

router.get('/userId/:id', auth.authSignin, userController.getUserById);
// a route to display the edit form
router.get('/update/userId/:id', auth.authSignin, userController.getUpdatePage);
// Route to show confirmation page
router.get('/delete/userId/:id', auth.authSignin, userController.getDeletePage);
router.put('/userId/:id', auth.authSignin, userController.updateUser);
router.delete('/userId/:id', auth.authSignin, userController.deleteUser);
router.get('/users', auth.authSignin, userController.getAllUsers);

export default router;
