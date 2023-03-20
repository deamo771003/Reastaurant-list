const exphbs = require('express-handlebars')
const express = require('express')
const restaurantList = require('./restaurant.json')
const restaurantListResults = restaurantList.results
const app = express()
const port = 3000

// 導入public內的.css
app.use(express.static('public'))

// template engine 模板引擎 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// index
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results })
})

// show
app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurantListResults.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantList = restaurantListResults.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { keyword: keyword, restaurantList: restaurantList })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})