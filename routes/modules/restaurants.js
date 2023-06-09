const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create
router.get('/new', (req, res) => {
  const newCategory = ['中東料理', '日式料理', '義式料理', '美式料理', '酒吧', '咖啡廳']
  const newRating = ['1', '2', '3', '4', '5']
  const newCity = ['台北', '新北', '桃園', '新竹', '苗栗', '台中', '彰化', '雲林', '嘉義', '台南', '高雄', '屏東', '台東', '花蓮', '宜蘭', '基隆', '金門', '連江', '澎湖']
  const { name, category, city, location, phone, description, image, google_map, rating } = req.flash('inputValue')[0] || {}
  return res.render('new', { newCategory: newCategory, newRating: newRating, newCity: newCity, name, category, city, location, phone, description, image, google_map, rating })
})

router.post('/', (req, res, next) => {
  const userId = req.user._id // 抓取使用者ID，以下新增資料後一同匯入
  const { name, category, city, location, phone, description, image, google_map, rating } = req.body

  if (name.length <= 0 || category.length <= 0 || location.length <= 0 || description.length <= 0 || image.length <= 0 || google_map.length <= 0 || rating.length <= 0) {
    req.flash('inputValue', { name, category, city, location, phone, description, image, google_map, rating })
    throw new Error('請輸入必填欄位。')
  }
  if (phone.length < 10) {
    req.flash('inputValue', { name, category, city, location, phone, description, image, google_map, rating })
    throw new Error('電話號碼長度錯誤。')
  }

  return Restaurant.create({
    userId,
    name, category, city, location, phone, description, image, google_map, rating
  })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

// search
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  const sortSelect = req.query.sort
  let sortData = {}
  if (sortSelect === 'A-Z') {
    sortData = { name: 'asc' }
  } else if (sortSelect === 'Z-A') {
    sortData = { name: 'desc' }
  } else if (sortSelect === 'Category') {
    sortData = { category: 'asc' }
  } else if (sortSelect === 'City') {
    sortData = { city: 'asc' }
  } else {
    sortData = { _id: 'asc' }
  }
  Restaurant.find({ userId: userId })
    .lean()
    .sort(sortData)
    .then(restaurants => {
      const restaurantSearch = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: restaurantSearch, keyword: keyword, sortSelect: sortSelect })
    })
    .catch(error => console.log(error))
})

// Detail
router.get('/:id', (req, res) => {
  const id = req.params.id // 抓網址ID
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const category = ['中東料理', '日式料理', '義式料理', '美式料理', '酒吧', '咖啡廳']
  const newRating = ['1', '2', '3', '4', '5']
  const newCity = ['台北', '新北', '桃園', '新竹', '苗栗', '台中', '彰化', '雲林', '嘉義', '台南', '高雄', '屏東', '台東', '花蓮', '宜蘭', '基隆', '金門', '連江', '澎湖']
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant, category: category, newRating: newRating, newCity: newCity }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res, next) => {
  const { name, category, city, location, phone, description, image, google_map, rating } = req.body
  if (name.length <= 0 || category.length <= 0 || location.length <= 0 || description.length <= 0 || image.length <= 0 || google_map.length <= 0 || rating.length <= 0) {
    req.flash('inputValue', { name, category, city, location, phone, description, image, google_map, rating })
    throw new Error('請輸入必填欄位。')
  }
  if (phone.length < 10) {
    req.flash('inputValue', { name, category, city, location, phone, description, image, google_map, rating })
    throw new Error('電話號碼長度錯誤。')
  }
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

// delete
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router

