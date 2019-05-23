const request = require('supertest');
const { Genre } = require('../../models/genre');

let server;


describe('/api/genres', () => {
  beforeEach(() => { server  = require('../../server'); });
  afterEach(() => { server.close(); });

  describe('GET /', () => {
    it('Should return all genres', async() => {
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
    });
  });

  describe('POST /', () => {
    it('Should add new genre', async() => {
      const res = await request(server).post('/api/genres');
      expect(res.status).toBe(200);
    });
  });

});