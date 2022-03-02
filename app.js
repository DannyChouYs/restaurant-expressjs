const express = require('express')
const app = express()
const port = 3000

// 模板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// public檔案存取
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/show', (req, res) => {
  res.render('show')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})