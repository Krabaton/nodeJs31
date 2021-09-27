const express = require('express')
const got = require('got')
const { query, validationResult } = require('express-validator')
const router = express.Router()
require('dotenv').config()

// const route_middle = (req, res, next) => {
//   console.log('My route middleware')
//   next()
// }

router.get(
  '/',
  [query('lat').isNumeric(), query('lon').isNumeric()],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { lat, lon } = req.query
    const appid = process.env.API_OPENWEATHER_KEY
    try {
      const response = await got(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          searchParams: { lat, lon, appid },
        },
      )
      res.json(JSON.parse(response.body))
    } catch (error) {
      next(error)
    }
  },
)

module.exports = router
