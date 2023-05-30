const bcrypt = require('bcryptjs')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose') // 呼叫mongoose裡的db
const { users, restaurants } = require('../data')

// Mongoose 連線成功
db.once('open', () => {
  Promise.all(
    users.map((user, user_index) => {
      // 創建使用者資料(user): model.create
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then((user) => {
          console.log('user created')
          const userRestaurant = []
          restaurants.forEach((restaurant, rest_index) => {
            if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) { // 每個user加入3間餐廳
              restaurant.userId = user._id
              userRestaurant.push(restaurant)
            }
          })
          return Restaurant.create(userRestaurant)
        })
    })
  ).then(() => {
    console.log('所有使用者與餐廳資料創建完成')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
})