const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// login
router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // 驗證成功轉址
  failureRedirect: '/users/login', // 驗證失敗轉址
  failureFlash: true
}))

// register
router.get('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.flash('inputValues')[0] || {} // 變數帶入req.flash存儲的值
  return res.render('register', { name, email, password, confirmPassword })
})

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  if (!email || !password || !confirmPassword) {
    req.flash('inputValues', { name, email, password, confirmPassword }) // 如有錯誤則先將錯誤值存入req.flash的變數inputValues
    throw new Error('email、password、confirmPassword 是必填。')
  }
  if (password !== confirmPassword) {
    req.flash('inputValues', { name, email, password, confirmPassword })
    throw new Error('password 與 confirmPassword 不符。')
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('inputValues', { name, email, password, confirmPassword })
        throw new Error('這個 email 已經註冊過了。')
      }
      // 加密 加鹽雜湊
      return bcrypt // return是等待 bcrypt 完成 回傳資訊後再進行下面的User.create
        .genSalt(10) // 加鹽,係數10
        .then(salt => bcrypt.hash(password, salt)) // 使用者密碼加鹽後雜湊
        .then(hash => User.create({
          name,
          email,
          password: hash // 加鹽雜湊後存入資料庫
        }))
        .then(() => res.redirect('/'))
    })
    .catch(err => next(err))
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router

