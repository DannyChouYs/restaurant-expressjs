const express = require('express')
const app = express()
const port = 3000

// 外部JSON
const restaurantList = require('./restaurant.json')

// 模板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// public檔案存取
app.use(express.static('public'))

// 餐廳清單頁面
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

// 個別頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', {restaurant: restaurant})
})

// 搜尋頁面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase().trim()
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.category.includes(keyword) || restaurant.name.toLocaleLowerCase().includes(keyword)
  })
  res.render('index', {restaurants: restaurant})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})