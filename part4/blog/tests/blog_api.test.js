const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

let token = '';

beforeAll(async () => {
  const newUser = {
    username: 'John D',
    name: 'John Doe',
    password: 'drowssap',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const loginResponse = await api
    .post('/api/login')
    .send({ username: newUser.username, password: newUser.password });

  token = loginResponse.body.token;
});
afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});

beforeEach(async () => {
  await Blog.deleteMany({});

  helper.initialBlogs.forEach(async (blog) => {
    const blogObject = new Blog(blog);
    await blogObject.save();
  });
});

describe('when there is initially some blogs saved', () => {
  test('id exists', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`);
    // eslint-disable-next-line no-restricted-syntax
    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    delete response.body.user;
    delete blogsAtEnd[blogsAtEnd.length - 1].user;
    expect(blogsAtEnd[blogsAtEnd.length - 1]).toMatchObject(
      response.body,
    );
  });

  test('a new blog without likes default to 0', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('bad request if title is missing for new blog', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('bad request if url is missing for new blog', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      title: 'Go To Statement Considered Harmful',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});

describe('update of blog', () => {
  test('a valid blog can be updated ', async () => {
    const updatedBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
    };

    await api
      .put('/api/blogs/5a422b891b54a676234d17fa')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedblogInDb = await helper.getBlogInDbById('5a422b891b54a676234d17fa');
    expect(updatedblogInDb).toEqual({
      ...updatedBlog,
      id: '5a422b891b54a676234d17fa',
    });
  });
});
