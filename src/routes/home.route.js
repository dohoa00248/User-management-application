import express from 'express';
import userService from '../services/user.mongoose.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await userService.findAllUsers();
    return res.render("home.ejs", { users: users });
})

export default router