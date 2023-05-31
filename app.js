const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const session = require('express-session')
// 載入passport設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const routes = require('./routes')
const PORT = process.env.PORT || 3000
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const handlebars = require('handlebars')

// mongoose
require('./config/mongoose')

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// PUT啟用並定義methodOverride
app.use(methodOverride('_method'))

// 導入public內的.css
app.use(express.static('public'))

// template engine 模板引擎 handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// handlebars eq function
// === function
handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// connect-flash
app.use(flash())

// 呼叫 Passport 函式並傳入 app，這條要寫在session之後 路由之前
usePassport(app)

// run routes前檢查驗證 代表這組 middleware 會作用於所有的路由
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() // 把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
  res.locals.user = req.user // 把user給res使用
  res.locals.success_messages = req.flash('success_messages') // res.locals設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // res.locals設定 warning_msg 訊息
  next()
})

// router
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})