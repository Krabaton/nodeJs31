const fs = require('fs/promises')
const file = '../base/main.mjs'

const isAccessible = async (path) => {
  try {
    await fs.access(path)
    return true
  } catch (err) {
    return false
  }
}

;(async (fileName) => {
  const file = await fs.readFile(fileName, 'utf8')
  if (!(await isAccessible('./temp'))) {
    await fs.mkdir('./temp')
  }
  await fs.writeFile('./temp/temp.mjs', `${file} console.log('Hello!')`)
})(file)
