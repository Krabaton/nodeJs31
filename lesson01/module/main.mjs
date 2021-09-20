import { info } from './module.mjs'
import { log } from './module.js'

global.variable = 42

info('Hi ECMAScript modules')
log('Hi CommonJS modules')
