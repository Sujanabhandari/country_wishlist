const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var validator = require('validator');
const countriesSchema = new Schema({

  name: { type: String, required: true, minLength: 2,  maxLength: 255 },
  alpha2Code: { type: String, required: true, unique: [ validator.isISO31661Alpha3, 'Invalid country']},
  alpha3Code : { type: String, required: true, unique: true, validate: [ validator.isISO31661Alpha3, 'Invalid country']}
});

const Country = mongoose.model("Country", countriesSchema);

module.exports = Country;
