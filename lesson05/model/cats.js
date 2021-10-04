const { ObjectId } = require('mongodb')
const db = require('./db')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listCats = async () => {
  const collection = await getCollection(db, 'cats')
  const results = await collection.find({}).toArray()
  return results
}

const getCatById = async (id) => {
  const collection = await getCollection(db, 'cats')
  const oid = new ObjectId(id)
  const [result] = await collection.find({ _id: oid }).toArray()
  return result
}

const removeCat = async (id) => {
  const collection = await getCollection(db, 'cats')
  const oid = new ObjectId(id)
  const { value: result } = await collection.findOneAndDelete({ _id: oid })
  return result
}

const addCat = async (body) => {
  const newCat = {
    isVaccinated: false,
    ...body,
  }
  const collection = await getCollection(db, 'cats')
  const result = await collection.insertOne(newCat)
  return await getCatById(result.insertedId)
}

const updateCat = async (id, body) => {
  const collection = await getCollection(db, 'cats')
  const oid = new ObjectId(id)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: oid },
    { $set: body },
    { returnDocument: 'after' },
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
