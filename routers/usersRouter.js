const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');
require('dotenv').config();

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('IDs');
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('singin');
});
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await Users.findOne({ where: { email }, raw: true });
      if (await bcrypt.compare(password, user.password)) {
        req.session.id = user.id;
        req.session.name = user.name;
        req.session.email = user.email;
        return res.redirect('/');
      }
      return res.render('singin', { error: 'Введите правильное имя пользователя или пароль' });
    }
  } catch (error) {
    return res.render('singin', { error: 'Введите правильное имя пользователя или пароль' });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name && email && password) {
      const user = await Users.findOne({ where: { email } });
      if (user) {
        return res.render('register', { error: 'Пользователь с такой почтой уже зарегистрирован, пожалуйста войдите в систему' });
      }
      // eslint-disable-next-line max-len
      const userReg = await Users.create({ name, email, password: await bcrypt.hash(password, Number(process.env.SALTROUNDS)) });
      req.session.id = userReg.id;
      req.session.name = userReg.name;
      req.session.email = userReg.email;
      return res.redirect('/');
    }
  } catch (error) {
    return res.render('register', { error: 'Введите валидное имя пользователя, почту и пароль' });
  }
  return res.render('register', { error: 'Введите имя пользователя, почту и пароль для регистрации' });
});

module.exports = router;
