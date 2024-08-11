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

const router = express.Router();

router.get("/", userController.getUserPage);

router.post("/create", userController.createUser);
router.get("/userId/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/users", userController.getAllUsers);

export default router;
