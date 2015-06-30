var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var commentSchema = Schema({
    author: String,
    content: String,
});

var sectionSchema = Schema({
    title: String,
    content: String,
    comments: [commentSchema]
});

var articleSchema = Schema({
    author: String,
    title: String,
    content: [sectionSchema]
});

var Section = mongoose.model('Section', sectionSchema)
var Article = mongoose.model('Article', articleSchema);

module.exports = {
  Section : Section,
  Article : Article
};
