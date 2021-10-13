const express = require('express')
const router = express.Router()
const { registration, login, logout } = require('../../controllers/users')
const guard = require('../../helpers/guard')
const loginLimit = require('../../helpers/rate-limit-login')

router.post('/registration', registration)
router.post('/login', loginLimit, login)
router.post('/logout', guard, logout)

module.exports = router
