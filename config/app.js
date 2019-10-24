require("dotenv").config();

module.exports = {
  port: 8080,
  database: 'mongodb://localhost:27017/restaurants',
  foursquare_id: process.env.FOURSQUARE_ID,
  foursquare_secret: process.env.FOURSQUARE_SECRET
}
