const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('short'))

app.use((req, res, next) => {
  console.log(req.ip)
  next()
})

app.use('/weather', require('./routes/weather'))

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
