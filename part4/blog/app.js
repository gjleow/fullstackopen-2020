const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expressJwt = require('express-jwt');

const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const config = require('./utils/config');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

const jwtMiddleWare = expressJwt(
  {
    secret: config.SECRET,
    algorithms: ['HS256'],
  },
).unless({
  path: [
    { url: '/api/users', methods: ['POST'] },
  ],
});

app.use('/api/users', jwtMiddleWare, usersRouter);
app.use('/api/blogs', jwtMiddleWare, blogsRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
