const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  // 初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy( // 選擇使用passport策略，使用LocalStrategy策略LocalStrategy( 設定客製化選項, 登入認證程序 )
    // customize user field
    {
      usernameField: 'email', // 帳號用email
      passwordField: 'password', // 密碼用密碼
      passReqToCallback: true // 回傳資訊至req
    },
    // authenticate user
    (req, email, password, cb) => { // cb = callback = 官方文件的 done
      User.findOne({ email }) // database 找以上 email
        .then(user => { // 相同 email 的資訊帶入 user
          if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！')) // if database不存在以上 email 直接通知 client ，存在就繼續下一步
          bcrypt.compare(password, user.password) // bcrypt解析 輸入的 password 與該 email database 的 password
            .then(res => {
              if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！')) // 不一樣直接通知 client，一樣就繼續下一步
              return cb(null, user) // 以上沒問題把 user 回傳進行下一步
            })
        })
    }
  ))

  // 設定facebook登入策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'] // 需與FB拿回的資料,displayName = fb上公開名稱
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user) // 如果database已有資料就回傳
        // 由於屬性 password 有設定必填，我們還是需要幫使用 Facebook 註冊的使用者製作密碼。因此這裡刻意設定一串亂碼
        const randomPassword = Math.random().toString(36).slice(-8) // 亂數a-z 1-9字串，取最後8位字串
        // 加鹽雜湊加密
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt)) // randomPassword加鹽後雜湊
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          // passport驗證成功後，呼叫done(err,user,info)，本案為驗證成功done(沒錯誤,user傳給done)
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}