const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const Blog = require('./models/blog');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = config.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
