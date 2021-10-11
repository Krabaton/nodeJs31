const Cats = require('../repository/cats')

const getCats = async (req, res, next) => {
  try {
    console.log(req.method)
    const cats = await Cats.listCats()
    res.json({ status: 'success', code: 200, data: { cats } })
  } catch (error) {
    next(error)
  }
}

const getCat = async (req, res, next) => {
  try {
    const cat = await Cats.getCatById(req.params.id)
    console.log(cat)
    console.log(cat.id)
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

const saveCat = async (req, res, next) => {
  try {
    const cat = await Cats.addCat(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { cat } })
  } catch (error) {
    next(error)
  }
}

const removeCat = async (req, res, next) => {
  try {
    const cat = await Cats.removeCat(req.params.id)
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

const updateCat = async (req, res, next) => {
  try {
    console.log(req.method)
    const cat = await Cats.updateCat(req.params.id, req.body)
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

const updateStatusVaccinatedCat = async (req, res, next) => {
  try {
    const cat = await Cats.updateCat(req.params.id, req.body)
    if (cat) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCats,
  getCat,
  removeCat,
  saveCat,
  updateCat,
  updateStatusVaccinatedCat,
}
