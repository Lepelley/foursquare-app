const Restaurant = require('../models/restaurant');
const config = require ('../config/app');
const request = require('request');

exports.restaurantList = (req, res, next) => {
  Restaurant.find((err, restaurants) => {
      if (err) {
        return console.error(err);
      }
      res.status(200).json(restaurants);
  })
};

exports.restaurantAdd = (req, res, next) => {
  const restaurant_id = req.params.restaurant_id;

  Restaurant.findOne( {restaurant_id: restaurant_id })
    .then(restaurant => {
      if(restaurant) { // if found in database, print it
        res.status(201).json(restaurant);
      }
      else { // else add it to the database
        const api_url = `https://api.foursquare.com/v2/venues/${restaurant_id}`;
        request({
          url: api_url,
          method: 'GET',
          qs: { // Params
            client_id: config.foursquare_id,
            client_secret: config.foursquare_secret,
            v: '20191017'
          }
        },
        (error, response, body) => {
          if (error) {
            console.error(error);
          }
          else {
            const json = JSON.parse(body);
            if (json.meta.code >= 200 & json.meta.code < 300) { // if API sent a good response
              if ((json.response.venue.categories[0].name).toLowerCase().includes('restaurant')) { // only add which contains restaurant in their first category
                const data = [{
                  restaurant_id: json.response.venue.id,
                  name: json.response.venue.name,
                  address: json.response.venue.location.address,
                  postalCode: json.response.venue.location.postalCode,
                  city: json.response.venue.location.city,
                  state: json.response.venue.location.state,
                  country: json.response.venue.location.country,
                  type: json.response.venue.categories[0].name
                }];

                const newRestaurant = new Restaurant(data[0]);

                // save it to the database
                newRestaurant.save(function (err, newRestaurant) {
                  if (err) return console.error(err);
                });

                res.status(201).json(data);
              }
              else {
                res.status(400).json(json);
              }
            }
            else {
              res.status(400).json({meta:{code: 400}});
            }
          }
        })
      }
    })
    .catch((err) => {
      console.error(`Erreur : ${err}`);
      res.status(400);
    })
};

exports.restaurantsAddNearCity = (req, res, next) => {
  const param_city = req.params.city;
  const api_url = 'https://api.foursquare.com/v2/venues/search';
  request({
    url: api_url,
    method: 'GET',
    qs: { // Params
      client_id: config.foursquare_id,
      client_secret: config.foursquare_secret,
      near: param_city,
      query: 'restaurant',
      v: '20191017',
      limit: 50
    }
  },
  (error, response, body) => {
    if (error) {
      console.error(error);
    }
    else {
      const json = JSON.parse(body);
      if (json.meta.code >= 200 & json.meta.code < 300) { // if API sent a good response
        let data = [];
        let i = 0, j = 0;

        for (i = 0 ; i < json.response.venues.length ; i++) { // execute until we reach the end of the json file
          if (Object.entries(json.response.venues[i].categories).length > 0) { // if a category of the restaurant is define, we can add it
            data[j++] = {
              restaurant_id: json.response.venues[i].id,
              name: json.response.venues[i].name,
              address: json.response.venues[i].location.address,
              postalCode: json.response.venues[i].location.postalCode,
              city: json.response.venues[i].location.city,
              state: json.response.venues[i].location.state,
              country: json.response.venues[i].location.country,
              type: json.response.venues[i].categories[0].name
            }
          }
        }

        data.forEach((dataRestaurant) => { // loop on array
          const newRestaurant = new Restaurant(dataRestaurant);

          newRestaurant.save((err, newRestaurant) => { // save to the database
            if (err) {
              return console.error(err);
            }
          });
        });

        res.status(201).json(data);
      }
      else {
        console.log(json)
        res.status(400).json({meta:{code: 400}});
      }
    }
  })
};

exports.restaurantsDeleteAll = (req, res, next) => {
  Restaurant.remove({}, (callback) => {});
  res.send('Total destruction');
};
