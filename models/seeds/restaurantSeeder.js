const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  const restaurant = restaurantList.results
  Restaurant.create(restaurant, (err) => {
    if (err) throw err
    console.log('done')
  })
})