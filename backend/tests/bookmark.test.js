// backend/tests/bookmark.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Bookmark = require('../models/Bookmark');

describe('Bookmark Management', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/bookmarkshare_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Bookmark.deleteMany({});
  });

  test('creates a bookmark', async () => {
    const res = await request(app)
      .post('/api/bookmarks')
      .send({
        user: 'someUserId',
        title: 'Test Bookmark',
        url: 'http://example.com',
        description: 'A test bookmark',
        tags: ['test', 'bookmark']
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toEqual('Test Bookmark');
  });
});
