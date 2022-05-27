/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const router = require('express').Router();
const {
  Users,
  Posts,
  Rate,
  Comments,
} = require('../db/models/index');
const rate = require('../db/models/rate');

router.get('/add', (req, res) => {
  res.render('addpost');
});

router.post('/add', async (req, res) => {
  console.log(req.body);
  const {
    title, start, finish, location, lengthRoad, user_id,
  } = req.body;
  try {
    if (title && start && finish && lengthRoad) {
      await Posts.create({
        title, start, finish, location, lengthRoad, user_id,
      });
      return res.redirect('/posts');
    }
  } catch (err) {
    return res.render('addpost', { error: 'Пожалуйста заполните все поля' });
  }
  return res.render('addpost', { error: 'Пожалуйста заполните все поля' });
});

router.get('/', async (req, res) => {
  const posts = await Posts.findAll({
    include: {
      model: Rate,
    },
  });

  const allPosts = JSON.parse(JSON.stringify(posts));

  const mapping = allPosts.map((el) => {
    if (el.Rates) {
      el.rating = 0;
      el.leng = 0;
      el.Rates.map((elem) => {
        el.rating += elem.grade;
        el.leng += 1;
      });
      el.midleRating = Math.floor(el.rating / el.leng);
    }
  });
  res.render('posts', { allPosts });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findAll({
    where: { id },
  });
  const user = await Posts.findOne({
    where: { id },
    include: { model: Users },
  });
  const comment = await Comments.findAll({
    where: { post_id: id },
  });
  const rating = await Rate.findAll({
    where: { post_id: id },
  });
  let result = 0;
  const middleRating = rating.map((el) => {
    result += el.grade;
  });
  JSON.parse(JSON.stringify(post));
  JSON.parse(JSON.stringify(comment));
  result = Math.floor(result / rating.length);
  JSON.parse(JSON.stringify(result));
  const { name } = JSON.parse(JSON.stringify(user.User));

  res.render('deatailpost', {
    name, post, comment, result,
  });
});

router.post('/addcomment', async (req, res) => {
  console.log(req.body);
  const { comment, user_id, post_id } = req.body;
  try {
    if (comment && user_id && post_id) {
      await Comments.create({
        comment, user_id, post_id,
      });
      return res.redirect(`/posts/${post_id}`);
    }
    return res.render('deatailpost', { error: 'Пожалуйста введите коммеентарий' });
  } catch (err) {
    return res.render('deatailpost', { error: 'Пожалуйста введите коммеентарий' });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
