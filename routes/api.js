const express = require('express');
const request = require('request');
const Restaurant = require('../models/restaurant');
const RestaurantController = require('../controllers/restaurant');

const router = express.Router();

router.get('/restaurants/get', RestaurantController.restaurantList);

router.get('/restaurant/add/:restaurant_id', RestaurantController.restaurantAdd);

router.get('/restaurants/add/:city', RestaurantController.restaurantsAddNearCity);

// uncomment at risk
//router.get('/restaurants/delete/all', RestaurantController.restaurantsDeleteAll);

module.exports = router;
