const request = require('supertest');
const app = require('../app');

describe('Blog Application', () => {

  test('GET /auth/login returns page', async () => {
    const res = await request(app).get('/auth/login');
    expect(res.statusCode).toBe(200);
  });

  test('GET /auth/register returns page', async () => {
    const res = await request(app).get('/auth/register');
    expect(res.statusCode).toBe(200);
  });

  test('POST /auth/login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'wrong', password: 'wrong' });

    expect(res.statusCode).toBe(200);
  });

  test('GET /auth/logout redirects', async () => {
    const res = await request(app).get('/auth/logout');
    expect(res.statusCode).toBe(302);
  });

  test('GET / redirects unauthenticated user', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(302);
  });

  test('GET /new-post redirects unauthenticated user', async () => {
    const res = await request(app).get('/new-post');
    expect(res.statusCode).toBe(302);
  });

  test('POST /new-post redirects unauthenticated user', async () => {
    const res = await request(app).post('/new-post');
    expect(res.statusCode).toBe(302);
  });

  test('GET /admin returns forbidden', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(403);
  });

  test('Login route responds with content', async () => {
    const res = await request(app).get('/auth/login');
    expect(res.text).toBeDefined();
  });

  test('Register route responds with content', async () => {
    const res = await request(app).get('/auth/register');
    expect(res.text).toBeDefined();
  });

});
