const os = require('os')
const path = require('path')

// console.log(os.cpus())
// console.log(os.cpus().length)

// console.log(path.resolve('/foo/bar', './baz'))
// console.log(path.resolve('/foo/bar', '/tmp/file/'))
// console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))

// console.log(__filename)
// console.log(__dirname)
// console.log(path.join(__dirname, '/foo', 'bar', 'baz/asdf', 'quux', '..'))
// console.log(path.join(__dirname, 'main.cjs'))

//console.log(process.argv)

// process.on('exit', (code) => {
//   console.log(code)
// })

// process.exit(1)

console.log(__dirname)
console.log(process.cwd())
