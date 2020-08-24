const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

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
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
