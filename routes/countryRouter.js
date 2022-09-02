var express = require("express");
var router = express.Router();
const { body, validationResult } = require('express-validator');

const {add_new_Country, get_countries_list
 ,retrieve_student_by_code
  // ,update_all_field_of_student
} = require("../controllers/country_controller");
/* GET users listing. */

// router.route('/').post(create_new_Student).get(get_student_list);

// router.route('/:id').get(retrieve_student_by_id).put(update_all_field_of_student).patch(update_one_field_of_student);

router.route('/countries').post(add_new_Country).get(get_countries_list);
router.route('/countries/:code').get(retrieve_student_by_code);
module.exports = router;
