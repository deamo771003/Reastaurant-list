const exphbs = require('express-handlebars')
const express = require('express')
const restaurantList = require('./restaurant.json')
const restaurantListResults = restaurantList.results
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const handlebars = require('handlebars');

// handlebars eq function
// === function
handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// PUT啟用並定義methodOverride
app.use(methodOverride('_method'))

// router
const routes = require('./routes')
const Restaurant = require('./models/restaurant')

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

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})