const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create
router.get('/new', (req, res) => {
  const newCategory = ['中東料理', '日式料理', '義式料理', '美式料理', '酒吧', '咖啡廳']
  res.render('new', { newCategory: newCategory })
})
router.post('/', (req, res) => {
  const { name, category, location, phone, description, image, map } = req.body
  return Restaurant.create({
    name: name,
    category: category,
    location: location,
    phone: phone,
    description: description,
    image: image,
    google_map: map
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => {
      const restaurantSearch = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })

      res.render('index', { restaurants: restaurantSearch })
    })
    .catch(error => console.log(error))
})

// show
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
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant, category: category }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, location, phone, description, image, map } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      Object.assign(restaurant, {
        name,
        category,
        location,
        phone,
        description,
        image,
        google_map: map
      })
      return restaurant.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
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