import express from "express";
import userController from "../controllers/user.mongodb.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello user-mongodb");
});

router.post("/create", userController.createUser);
router.get("/userId/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/users", userController.getAllUsers);

export default router;