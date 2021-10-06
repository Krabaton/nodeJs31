const Cat = require('../model/cat')

const listCats = async () => {
  const results = await Cat.find({})
  return results
}

const getCatById = async (id) => {
  const result = await Cat.findById(id)
  return result
}

const removeCat = async (id) => {
  const result = await Cat.findByIdAndRemove({ _id: id })
  return result
}

const addCat = async (body) => {
  const result = await Cat.create(body)
  return result
}

const updateCat = async (id, body) => {
  const result = await Cat.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
}
