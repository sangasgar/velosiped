const router = require('express').Router();

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('IDs');
  res.redirect('/');
});

module.exports = router;
