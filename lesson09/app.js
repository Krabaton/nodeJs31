const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const boolParser = require('express-query-boolean')
const helmet = require('helmet')
require('dotenv').config()
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS
const catsRouter = require('./routes/cats/cats')
const usersRouter = require('./routes/users/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(express.static(AVATAR_OF_USERS))
app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use(boolParser())

app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'ru']))
  next()
})

app.use('/api/users', usersRouter)
app.use('/api/cats', catsRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    status: statusCode === 500 ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  })
})

module.exports = app
