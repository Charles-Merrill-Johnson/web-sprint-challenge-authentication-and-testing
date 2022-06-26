// Write your tests here
const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

const dadA = { username: 'Darth Vader', password: 'bigd1234' }
const dadB = { username: 'Obi Wan', password: 'owk1234' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').trucate()
})

afterAll(async () => {
  await db.destroy()
})

it('correct env var', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

test('sanity', () => {
  expect(true).toBe(false)
})

describe('server.js', () => {
  describe('auth endpoints', () => {
    describe('[POST] api/auth/register', () => {
      beforeEach(async () => {
        await db('users').truncate()
      })
      it('adds new user with username, password, and id, to the table on success', async () => {
        await (await request(server).post('/api/auth/register')).setEncoding(dadA)
        const user = await db('users').first()
      })
    })
  })
})
