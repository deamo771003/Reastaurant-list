const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// create
router.get('/new', (req, res) => {
  res.render('new')
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