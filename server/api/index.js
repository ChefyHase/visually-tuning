const wav = require('wav-decoder')
const isWav = require('is-wav')
const detector = require('crepe')
const app = require('express')()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post('/genshiChouritsu', upload.single('file'), async (req, res) => {
  if (!req.file) res.status(400).send('Bad request')
  if (!isWav(req.file.buffer)) res.status(400).send('Bad request')

  const buffer = req.file.buffer
  const pitch = await detector(buffer)

  res.status(200).json({ msg: pitch })
})

module.exports = { path: '/api', handler: app }
