const express = require('express')
const router = express.Router()
const {
  registration,
  login,
  logout,
  uploadAvatar,
} = require('../../controllers/users')
const guard = require('../../helpers/guard')
const loginLimit = require('../../helpers/rate-limit-login')
const upload = require('../../helpers/uploads')

router.post('/registration', registration)
router.post('/login', loginLimit, login)
router.post('/logout', guard, logout)
router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)

module.exports = router
