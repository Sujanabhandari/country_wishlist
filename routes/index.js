var express = require('express');
var router = express.Router();

const {add_new_Country, get_countries_list
  ,retrieve_student_by_code
  ,update_all_field_of_country, delete_country_by_condition
 
 } = require("../controllers/country_controller");

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.route('/').get(get_countries_list);

module.exports = router;
