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

router.get('/', getCats)

router.get('/:id', validateId, getCat)

router.post('/', validateCat, saveCat)

router.delete('/:id', validateId, removeCat)

router.put('/:id', [validateId, validateCat], updateCat)

router.patch(
  '/:id/vaccinated/',
  [validateId, validateStatusCat],
  updateStatusVaccinatedCat,
)

module.exports = router
