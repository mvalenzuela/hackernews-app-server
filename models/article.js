const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    id: Number,
    title: String,
    author: String,
    storyTitle: String,
    date: Date,
    url: String,
    storyUrl: String,
    deleted: {type: Boolean, default: false}
  },
  {strict: false}
);

module.exports = mongoose.model('Article', Article)
