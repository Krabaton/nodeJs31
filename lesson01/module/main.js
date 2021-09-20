const { info, log } = require('./module')

global.variable = 42

info('Hi CommonJS')
log('Hi CommonJS')

// import('./module.mjs').then((result) => {
//   const { info, log } = result
//   info('Hi ECMAScript modules')
// })
;(async () => {
  const result = await import('./module.mjs')
  const { info, log } = result
  info('Hi ECMAScript modules')
})()
