const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { ValidInfoCat } = require('../../config/constants')

const schemaCat = Joi.object({
  name: Joi.string().alphanum().min(1).max(20).required(),
  age: Joi.number()
    .integer()
    .min(ValidInfoCat.MIN_AGE)
    .max(ValidInfoCat.MAX_AGE)
    .required(),
  isVaccinated: Joi.boolean().optional(),
})

const schemaStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
})

const schemaId = Joi.object({
  id: Joi.objectId().required(),
})

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Field ${err.message.replace(/"/g, '')}`,
    })
  }
}

module.exports.validateCat = async (req, res, next) => {
  return await validate(schemaCat, req.body, res, next)
}

module.exports.validateStatusCat = async (req, res, next) => {
  return await validate(schemaStatusCat, req.body, res, next)
}

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next)
}
