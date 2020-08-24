const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    helper.initialBlogs.forEach(async (blog) => {
      const blogObject = new Blog(blog);
      await blogObject.save();
    });
  });

  test('id exists', async () => {
    const response = await api.get('/api/blogs');
    // eslint-disable-next-line no-restricted-syntax
    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
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
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    expect(blogsAtEnd).toContainEqual(
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
      .send(newBlog)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length - 1,
    );

    const title = blogsAtEnd.map((r) => r.title);

    expect(title).not.toContain(blogToDelete.title);
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

    const response = await api
      .put('/api/blogs/5a422b891b54a676234d17fa')
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

afterAll(() => {
  mongoose.connection.close();
});
