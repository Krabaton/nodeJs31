const http = require('http')
const fs = require('fs/promises')
const path = require('path')
const PORT = process.env.PORT || 3000

const TypeMime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

http
  .createServer(async (req, res) => {
    let filename = new URL(req.url, 'http://localhost:3000/').pathname
    console.log(filename)
    switch (filename) {
      case '/':
        filename = 'index.html'
        break
      case '/contact':
        filename = 'contact.html'
        break
      case '/blog':
        filename = 'blog.html'
        break
      default:
        break
    }
    try {
      const content = await fs.readFile(path.join(__dirname, filename))
      const contentType = TypeMime[path.extname(filename)]
      res.writeHead(200, { 'Content-Type': contentType })
      res.write(content)
      res.end()
    } catch (e) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      const content = await fs.readFile(path.join(__dirname, '404.html'))
      res.write(content)
      res.end()
    }
  })
  .listen(PORT, () => {
    console.log('Server started')
  })
