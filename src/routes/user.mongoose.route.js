// old
// const express = require("express");
// const router = express.Router();
// router.get('/', (req, res) => {
//     res.send("Hello world");
// })
// module.exports = router;

// Using mongoose

// new es(2017)
import express from "express";
import userController from "../controllers/user.mongoose.controller.js"
import userService from "../services/user.mongoose.service.js";
import User from "../models/user.mongoose.model.js";
const router = express.Router();

// router.get("/", userController.getHomeUserPage);

// router.get("/", async (req, res) => {
//     // res.send("Hello! userpage12");
//     const users = await userService.findAllUsers();
//     return res.render("home.ejs", { userList: users });
// })

router.post("/create", userController.createUser);
router.get("/create-user", (req, res) => {
    return res.render("create.user.mongoose.ejs");
})
router.get("/userId/:id", userController.getUserById);
router.put("/userId/:id", userController.updateUser);
router.delete("/userId/:id", userController.deleteUser);

// a route to display the edit form
router.get("/userId/:id/edit", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('update.user.mongoose.ejs', { user });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a user with form ejs
router.put("/userId/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to show confirmation page
router.get("/userId/:id/delete", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('delete.user.mongoose.ejs', { user });
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// Handle delete (DELETE request) with form ejs
router.delete('/userId/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get("/users", userController.getAllUsers);

export default router;
