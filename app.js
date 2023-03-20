const exphbs = require('express-handlebars')
const express = require('express')
const app = express()
const port = 3000

// 導入public內的.css
app.use(express.static('public'))

// template engine 模板引擎 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})