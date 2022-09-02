var express = require("express");
var router = express.Router();
const { body, validationResult } = require('express-validator');

const  checkInputValdations  =  require("../middlewares/checkInputValidations.js");



const {add_new_Country, get_countries_list
 ,retrieve_student_by_code
 ,update_all_field_of_country, delete_country_by_condition

} = require("../controllers/country_controller");



router.route('/countries').post(checkInputValdations, add_new_Country).get(get_countries_list);
router.route('/countries/:code').get(retrieve_student_by_code).put(update_all_field_of_country).delete(delete_country_by_condition);
module.exports = router;
