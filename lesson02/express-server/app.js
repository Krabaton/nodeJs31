const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const { articles } = require('./data/blog.json')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { name: 'Данил', surname: 'Прохорчук' })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.post('/contact', async (req, res) => {
  console.log(req.body)
  await fs.writeFile(
    path.join(__dirname, 'data', 'data.json'),
    JSON.stringify(req.body, null, 2),
  )
  res.redirect('/contact')
})

app.get('/blog', (req, res) => {
  res.render('blog', { articles })
})

app.use((req, res) => {
  res.status(404).render('404')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
