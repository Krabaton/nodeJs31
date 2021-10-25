const express = require('express')
const router = express.Router()
const {
  getCat,
  getCats,
  removeCat,
  saveCat,
  updateCat,
  updateStatusVaccinatedCat,
} = require('../../controllers/cats')
const { validateCat, validateStatusCat, validateId } = require('./validation')
const guard = require('../../helpers/guard')
const role = require('../../helpers/role')
const wrapError = require('../../helpers/errorHandler')
const { Gender } = require('../../config/constants')

router.get('/', guard, wrapError(getCats))

router.get(
  '/test',
  guard,
  role(Gender.MALE),
  wrapError((req, res, next) => {
    res.json({
      status: 'success',
      code: 200,
      data: { message: 'Only for man' },
    })
  }),
)

router.get('/:id', guard, validateId, wrapError(getCat))

router.post('/', guard, validateCat, wrapError(saveCat))

router.delete('/:id', guard, validateId, wrapError(removeCat))

router.put('/:id', guard, [(validateId, validateCat)], wrapError(updateCat))

router.patch(
  '/:id/vaccinated/',
  guard,
  [(validateId, validateStatusCat)],
  wrapError(updateStatusVaccinatedCat),
)

module.exports = router
