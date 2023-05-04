const bcrypt = require('bcryptjs')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose') // 呼叫mongoose裡的db
const restaurantList = require('../../restaurant.json')
const SEED_USER1 = {
  name: 'SEED_USER1',
  email: 'user1@example.com',
  password: '12345678'
}
const SEED_USER2 = {
  name: 'SEED_USER2',
  email: 'user2@example.com',
  password: '12345678'
}

// Mongoose 連線成功
db.once('open', () => {
  bcrypt // 加鹽雜湊
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({ // databast建立 seeder 資料
      name: SEED_USER1.name,
      email: SEED_USER1.email,
      password: hash
    }))
    .then(async user => {
      const userId = user._id
      for (let i = 0; i < 3; i++) {
        const restaurant = {
          name: restaurantList.results[i].name,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId: userId
        }
        await Restaurant.create(restaurant)
      }
    })
  bcrypt // 加鹽雜湊
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({ // databast建立 seeder 資料
      name: SEED_USER2.name,
      email: SEED_USER2.email,
      password: hash
    }))
    .then(async user => {
      const userId = user._id
      for (let i = 3; i < 6; i++) {
        const restaurant = {
          name: restaurantList.results[i].name,
          category: restaurantList.results[i].category,
          image: restaurantList.results[i].image,
          location: restaurantList.results[i].location,
          phone: restaurantList.results[i].phone,
          google_map: restaurantList.results[i].google_map,
          rating: restaurantList.results[i].rating,
          description: restaurantList.results[i].description,
          userId: userId
        }
        await Restaurant.create(restaurant)
      }
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})