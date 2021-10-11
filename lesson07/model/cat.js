const { Schema, model } = require('mongoose')
const { ValidInfoCat } = require('../config/constants')

const catSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true,
      required: [true, 'Set name for cat'],
    },
    age: {
      type: Number,
      min: ValidInfoCat.MIN_AGE,
      max: ValidInfoCat.MAX_AGE,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    isVaccinated: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      name: String,
      age: Number,
      address: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        // ret.name = `@${ret.name}`
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

catSchema.virtual('status').get(function () {
  if (this.age >= 10) {
    return 'old'
  }
  return 'young'
})

catSchema.path('name').validate(function (value) {
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

const Cat = model('cat', catSchema)

module.exports = Cat
