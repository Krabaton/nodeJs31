const { updateCat } = require('../controllers/cats')
const Cats = require('../repository/cats')
const { CustomError } = require('../helpers/customError')

jest.mock('../repository/cats')

describe('Unit test controller updateCat', () => {
  let req, res, next

  beforeEach(() => {
    Cats.updateCat = jest.fn()
    req = { params: { id: 3 }, body: {}, user: { _id: 1 } }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    next = jest.fn() // () => {}
  })

  it('Cat exist', async () => {
    const cat = { id: 3, name: 'Simon', age: 4 }
    Cats.updateCat = jest.fn(() => {
      return cat
    })
    const result = await updateCat(req, res, next)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('status')
    expect(result).toHaveProperty('code')
    expect(result).toHaveProperty('data')
    expect(result.data.cat).toEqual(cat)
  })

  it('Cat not exist v.1.0', async () => {
    await expect(updateCat(req, res, next)).rejects.toEqual(
      new CustomError(404, 'Not Found'),
    )
  })

  it('Cat not exist v.1.1', () => {
    return updateCat(req, res, next).catch((e) => {
      expect(e.status).toEqual(404)
      expect(e.message).toEqual('Not Found')
    })
  })
})
