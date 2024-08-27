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

router.get("/", userController.getHomeUserPage);

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
// a route to display the edit form
router.get('/update/userId/:id', userController.getUpdatePage);
// Route to show confirmation page
router.get('/delete/userId/:id', userController.getDeletePage);
router.put("/userId/:id", userController.updateUser);
router.delete("/userId/:id", userController.deleteUser);
router.get("/users", userController.getAllUsers);

export default router;
