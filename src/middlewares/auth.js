const authSignin = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.redirect('/api/v1/auth/signin');
};

export default {
  authSignin,
};
