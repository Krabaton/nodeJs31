const Cat = require('../model/cat')

const listCats = async (userId, query) => {
  // const results = await Cat.find({ owner: userId }).populate({
  //   path: 'owner',
  //   select: 'name email gender createdAt updatedAt',
  // })
  const {
    sortBy,
    sortByDesc,
    filter,
    isVaccinated = null,
    limit = 5,
    offset = 0,
  } = query
  const searchOptions = { owner: userId }
  if (isVaccinated !== null) {
    searchOptions.isVaccinated = isVaccinated
  }
  const results = await Cat.paginate(searchOptions, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // { name: 1 }
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email gender createdAt updatedAt',
    },
  })
  const { docs: cats } = results
  delete results.docs
  return { ...results, cats }
}

const getCatById = async (id, userId) => {
  const result = await Cat.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender createdAt updatedAt',
  })
  return result
}

const removeCat = async (id, userId) => {
  const result = await Cat.findOneAndRemove({ _id: id, owner: userId })
  return result
}

const addCat = async (body) => {
  const result = await Cat.create(body)
  return result
}

const updateCat = async (id, body, userId) => {
  const result = await Cat.findOneAndUpdate(
    { _id: id, owner: userId },
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
