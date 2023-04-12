const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const bodyName = req.body.name
  const bodyCategory = req.body.category
  const bodyLocation = req.body.location
  const bodyPhone = req.body.phone
  const bodyDescription = req.body.description
  const bodyImage = req.body.image
  const bodyMap = req.body.map

  return Restaurant.create({
    name: bodyName,
    category: bodyCategory,
    location: bodyLocation,
    phone: bodyPhone,
    description: bodyDescription,
    image: bodyImage,
    google_map: bodyMap
  })
    .then(() => res.redirect('/'))
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

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => {
      const restaurantSearch = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: restaurantSearch })
    })
    .catch(error => console.log(error))
})

module.exports = router