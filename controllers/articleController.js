const Article = require('../models/article');

exports.getAll = function (req, res) {
  Article.find({ deleted: false })
    .then(function (articles) {
      res.json(articles);
    }).catch(function (err) {
      console.log(err);
    });
}

exports.deleteOne = function (req, res) {
  Article.findOne({
    id: req.params.article_id
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
