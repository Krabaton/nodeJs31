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

router.get('/', guard, getCats)

router.get('/:id', guard, validateId, getCat)

router.post('/', guard, validateCat, saveCat)

router.delete('/:id', guard, validateId, removeCat)

router.put('/:id', guard, [(validateId, validateCat)], updateCat)

router.patch(
  '/:id/vaccinated/',
  guard,
  [(validateId, validateStatusCat)],
  updateStatusVaccinatedCat,
)

module.exports = router
