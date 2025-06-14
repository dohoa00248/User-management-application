import express from 'express';
import userService from '../services/user.mongoose.service.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  //   const users = await userService.findAllUsers();
  return res.render('home.ejs');
});
router.get('/admin/dashboard', auth.authSignin, async (req, res) => {
  const users = await userService.findAllUsers();
  return res.render('dashboard.ejs', { users: users, user: req.session.user });
});

export default router;
