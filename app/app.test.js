const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('responds with a 200 and a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Hello from the End-to-End CI\/CD demo app/);
  });
});

describe('GET /health', () => {
  it('responds with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
