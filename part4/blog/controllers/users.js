const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    if (body.password !== undefined && body.password.length < 3) {
      return response.status(400).json({ error: 'password length must be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201);
    response.json(savedUser);

    return response;
  } catch (exception) {
    return next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1, title: 1, author: 1, id: 1,
    });
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;