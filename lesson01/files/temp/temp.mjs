import { URL } from 'url'

const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname

console.log(__filename)
console.log(__dirname)
 console.log('Hello!')