const wavEncoder = require('wav-encoder')
const request = require('supertest')
const app = require('~/server/api').handler

describe('/genshiChouritsu', () => {
  test('returns 400 by POST without audio data.', async done => {
    let res = await request(app).post('/genshiChouritsu')
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .post('/genshiChouritsu')
      .type('form')
      .send({ name: 'test' })
    expect(res.statusCode).toBe(400)

    done()
  })

  test('returns json by POST audio data.', async done => {
    const wav = await wavEncoder.encode({
      sampleRate: 44100,
      channelData: [
        new Float32Array(44100).map(() => Math.random() - 0.5),
        new Float32Array(44100).map(() => Math.random() - 0.5)
      ]
    })
    const res = await request(app)
      .post('/genshiChouritsu')
      .field('file', 'file')
      .type('multipart/form-data')
      .attach('file', Buffer.from(wav), 'finename')

    expect(res.statusCode).toBe(200)
  })
})
