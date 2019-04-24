const request = require('request');
var mongoose = require('mongoose')
const Article = require('../models/article');

exports.getMessage = function (req, res) {
  request('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const bodyParsed = JSON.parse(body);
      bodyParsed.hits.forEach(function (hit) {
        articleExists(hit)
          .then((value) => {
            if (value) {
            } else {
              createArticle(hit)
            }
          });
      });
    }
  });
  res.json({
    success: true,
    message: 'Articles downloaded Successfully'
  })
};

function articleExists(hit){
  return Article.countDocuments({title: hit.title, storyTitle: hit.story_title})
    .then((count) => {
      if(count>0){
        return true;
      } else {
        return false;
      }
    });
}

function createArticle(hit){
  Article.create({
    url: hit.url,
    storyUrl: hit.story_url,
    author: hit.author,
    title: hit.title,
    storyTitle: hit.story_title,
    date: hit.date

  }, function (err, awesome_instance) {
    if (err) return handleError(err);
  });
}
