const _ = require('lodash');

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);
const favoriteBlog = (blogs) => blogs.reduce(
  (pre, cur) => ((pre.likes > cur.likes) ? _.omit(pre, ['_id', '__v']) : _.omit(cur, ['_id', '__v'])), {},
);

const mostBlog = (blogs) => _.maxBy(_.map(_.countBy(blogs, 'author'), (count, author) => (
  {
    author,
    blogs: count,
  }
)), 'blogs') || {};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlog,
};
