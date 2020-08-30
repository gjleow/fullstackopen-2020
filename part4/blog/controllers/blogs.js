const jwt = require('jsonwebtoken');

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const user = await User.findById(request.user.id);
  const blog = new Blog(request.body);
  // eslint-disable-next-line no-underscore-dangle
  blog.user = user._id;
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201);
    response.json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }
    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(401).end();
    }
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (exception) {
    return next(exception);
  }
});

module.exports = blogsRouter;
