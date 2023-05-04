const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: String,
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: String,
  description: String,
  city: String,
  userId: { // 建立User關聯，加入User資訊
    type: Schema.Types.ObjectId, // 資料型別為mongoose_id，與以下 ref 是一組設定
    ref: 'User', // 關聯User data
    index: true, // userID設定為索引搜尋項目增加讀取效能
    required: true
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
