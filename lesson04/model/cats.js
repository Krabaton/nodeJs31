const crypto = require('crypto')
const DB = require('./db')
const db = new DB('cats.json')

const listCats = async () => {
  return await db.read()
}

const getCatById = async (id) => {
  const cats = await db.read()
  const [cat] = cats.filter((cat) => cat.id === id)
  return cat
}

const removeCat = async (id) => {
  const cats = await db.read()
  const index = cats.findIndex((cat) => cat.id === id)
  if (index !== -1) {
    const [result] = cats.splice(index, 1)
    await db.write(cats)
    return result
  }
  return null
}

const addCat = async (body) => {
  const cats = await db.read()
  const newCat = {
    id: crypto.randomUUID(),
    isVaccinated: false,
    ...body,
    // ...(body.isVaccinated ? {} : { isVaccinated: false }),
  }
  // if (!body.isVaccinated) {
  //   newCat.isVaccinated = false
  // }
  cats.push(newCat)
  await db.write(cats)
  return newCat
}

const updateCat = async (id, body) => {
  const cats = await db.read()
  const index = cats.findIndex((cat) => cat.id === id)
  if (index !== -1) {
    cats[index] = { ...cats[index], ...body }
    await db.write(cats)
    return cats[index]
  }
  return null
}

module.exports = {
  listCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
}
