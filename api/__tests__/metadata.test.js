const request = require('supertest');
const metadata = require('../../lib/blog/metadata')

const host = 'http://localhost:3030/test'
const expectedTitle = "Test Domain"
const bucketName = process.env.SEEHUND_WEB_BUCKET
let originalTitle

beforeAll(async () => {
  originalTitle = await metadata.getValue({bucketName, key: 'title'})
})

beforeEach(async () => {
  await metadata.setValue({bucketName, key: 'title', value: expectedTitle})
})

afterAll(async () => {
  await metadata.setValue({bucketName, key: 'title', value: originalTitle})
})

describe('GET /metadata',  () => {
  it('responds with stuff', async () => {
    return request(host)
      .get('/metadata')
      .expect('Content-Type', /json/)
      .expect(200, { title: expectedTitle })
  })
})

describe('PUT /metadata',  () => {
  it('responds with stuff', async () => {
    return request(host)
      .put('/metadata')
      .send({title: 'New Title'})
      .expect('Content-Type', /json/)
      .expect(200, { title: "New Title" })
  })
})