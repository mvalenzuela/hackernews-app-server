const Article = require('../models/article');

exports.getAll = function (req, res, next) {
  Article.find({ deleted: false })
    .then(function (articles) {
      res.json(articles);
    }).catch(function (err) {
      console.log(err);
    });
}

exports.deleteOne = function (req, res) {
  console.log(req.query);
  Article.findOne({
    id: req.query.article_id
  }).then(( articleRecord) => {
    articleRecord.deleted = true;
    articleRecord.save();
  }).then(function (article){
    res.json({
      success: true,
      message: 'Article deleted Successfully'
    });
  }).catch(function (err) {
    res.status(500).json({
      success: false,
      message: 'There was a problem removing the Article'
    });
  })
}
