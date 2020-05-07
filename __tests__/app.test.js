require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../server.js');

describe('app routes', () => {
  beforeAll(() => {
    // TODO: a
  });

  beforeEach(() => {
    // TODO: ADD DROP SETUP DB SCRIPT
  });

  afterAll(() => {
    // TODO: ADD CLOSE DB SCRIPT
  });

  test('returns exercises', async() => {

    const expectation = [
      {
        id: 1,
        name: 'bench press',
        weight: 250,
        is_fullbody: false,
        type: 'resistance',
        user_id: 1
      },
      {
        id: 2,
        name: 'squats',
        weight: 180,
        is_fullbody: true,
        type: 'resistance',
        user_id: 1
      },
      {
        id: 3,
        name: 'deadlift',
        weight: 350,
        is_fullbody: false,
        type: 'resistance',
        user_id: 1
      },
      {
        id: 4,
        name: 'jump jacks',
        weight: 0,
        is_fullbody: true,
        type: 'calisthenics',
        user_id: 1
      }
    ];

    const data = await fakeRequest(app)
      .get('/exercises')
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('===============\n');
    console.log('|| data.body', data.body);
    console.log('===============\n');

    expect(data.body).toEqual(expectation);
  });
});
