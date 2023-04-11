const exphbs = require('express-handlebars')
const express = require('express')
const restaurantList = require('./restaurant.json')
const restaurantListResults = restaurantList.results
const app = express()
const port = 3000

// router
const routes = require('./routes')

// mongoose
require('./config/mongoose')

// 導入public內的.css
app.use(express.static('public'))

// template engine 模板引擎 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(express.urlencoded({ extended: true }))

app.use(routes)
// // home
// app.get('/', (req, res) => {
//   res.render('index', { restaurantList: restaurantListResults })
// })

// show
app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurantListResults.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// search
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword // index.hbs內的name=keyword的物件回傳值
//   const restaurantList = restaurantListResults.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { keyword: keyword, restaurantList: restaurantList })
// })

// new



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})