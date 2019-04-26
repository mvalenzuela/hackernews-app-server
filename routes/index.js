var express = require('express');
var router = express.Router();

const ArticleController = require('../controllers/articleController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/articles', ArticleController.getAll);
router.delete('/article', ArticleController.deleteOne)

module.exports = router;
