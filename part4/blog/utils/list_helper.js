const _ = require('lodash');

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);
const favoriteBlog = (blogs) => blogs.reduce(
  (pre, cur) => ((pre.likes > cur.likes) ? _.omit(pre, ['_id', '__v']) : _.omit(cur, ['_id', '__v'])), {},
);

module.exports = {
  totalLikes,
  favoriteBlog,
};
