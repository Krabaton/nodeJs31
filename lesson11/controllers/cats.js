const Cats = require('../repository/cats')
const { CustomError } = require('../helpers/customError')

const getCats = async (req, res) => {
  const userId = req.user._id
  const data = await Cats.listCats(userId, req.query)
  res.json({ status: 'success', code: 200, data: { ...data } })
}

const getCat = async (req, res, next) => {
  const userId = req.user._id
  const cat = await Cats.getCatById(req.params.id, userId)

  if (cat) {
    return res.status(200).json({ status: 'success', code: 200, data: { cat } })
  }

  throw new CustomError(404, 'Not Found')
}

const saveCat = async (req, res, next) => {
  const userId = req.user._id
  const cat = await Cats.addCat({ ...req.body, owner: userId })
  res.status(201).json({ status: 'success', code: 201, data: { cat } })
}

const removeCat = async (req, res, next) => {
  const userId = req.user._id
  const cat = await Cats.removeCat(req.params.id, userId)
  if (cat) {
    return res.status(200).json({ status: 'success', code: 200, data: { cat } })
  }
  throw new CustomError(404, 'Not Found')
}

const updateCat = async (req, res, next) => {
  const userId = req.user._id
  const cat = await Cats.updateCat(req.params.id, req.body, userId)
  if (cat) {
    return res.status(200).json({ status: 'success', code: 200, data: { cat } })
  }
  throw new CustomError(404, 'Not Found')
}

const updateStatusVaccinatedCat = async (req, res, next) => {
  const userId = req.user._id
  const cat = await Cats.updateCat(req.params.id, req.body, userId)
  if (cat) {
    return res.status(200).json({ status: 'success', code: 200, data: { cat } })
  }
  throw new CustomError(404, 'Not Found')
}

module.exports = {
  getCats,
  getCat,
  removeCat,
  saveCat,
  updateCat,
  updateStatusVaccinatedCat,
}
