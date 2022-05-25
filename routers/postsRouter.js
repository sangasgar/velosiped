const router = require('express').Router();

router.get('/add', (req, res) => {
  res.render('addpost');
});
router.get('/', (req, res) => {
  res.render('fullpost');
});

router.get('/post/id:', (req, res) => {
  res.render('detailpost');
});
module.exports = router;
