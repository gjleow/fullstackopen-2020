const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
});

describe('addition of a new user', () => {
  test('a valid user can be added ', async () => {
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

    const usersInDb = await helper.usersInDb();
    expect(usersInDb.length).toBe(1);

    expect(usersInDb).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: 'John D',
          name: 'John Doe',
        }),
      ]),
    );
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
