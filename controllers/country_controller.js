const Country = require("../models/Country");
const { body, validationResult } = require("express-validator");


const get_countries_list = async (req, res, next) => {
  const condition = req.query;
  // console.log(condition);
  // if(req.query === 'sort'){

  // }
  const { sort } = req.query;

  try {
    const allCountries = await Country.find(condition).sort(sort === 'true' && {
      name: 1
    });
    
    if (!allCountries.length)
      return res
        .status(400)
        .send(
          "The collection you are trying to query does not contain any documents"
        );
    
    return res.status(201).send(allCountries);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const add_new_Country = async (req, res, next) => {
  const { name, alpha2Code, alpha3Code, visited } = req.body;
  // console.log(req.body)

  // if (!name || !alpha2Code || !alpha3Code || !visited)
  //   return res
  //     .status(400)
  //     .send("Please provide values for name, alpha2Code , alpha3Code and visited");

  console.log(req.body)

  try {
    const newCountry = await Country.create({ name, alpha2Code, alpha3Code, visited});
    console.log(newCountry)
    return res.status(201).send(newCountry);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const retrieve_student_by_code = async (req, res, next) => {
  const { code } = req.params;

  // const condition = Object.entries(req.body)[0];

  try {
    const foundCounty = await Country.find({ 
      $or: [{ alpha2Code: code }, { alpha3Code: code }],
    }).collation({ locale: "en", strength: 2});

    if (foundCounty.length == 0)
      return res
        .status(404)
        .send(`<h1>The country with this code ${code} does not exist</h1>`);

    return res.status(200).send(foundCounty);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


const update_all_field_of_country = async (req, res, next) => {
  const { code } = req.params;
  console.log(code);
  const { name, alpha2Code, alpha3Code, visited } = req.body;

  const condition = Object.entries(req.body);

  if (!condition.length)
    return res
      .status(400)
      .send("Please provide a condition for your update operation");

  try {
    const updatedCountry = await Country.findOneAndUpdate(
      code,
      {
        name,
        alpha2Code,
        alpha3Code,
        visited
      },
      { new: true }
    );

    return res.status(200).send(updatedCountry);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const delete_country_by_condition = async (req, res, next) => {
  const condition = req.body;

  //in oder to check for thruthiness of an object we need to convert it to an array
  if (!Object.keys(condition).length)
    return res
      .status(400)
      .send("Please provide a condition for the delete operation");

  try {
    const deletedCountry = await Country.findOneAndDelete(condition);

    return res.status(200).send(deletedCountry);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  add_new_Country,
  get_countries_list,
  retrieve_student_by_code,
  update_all_field_of_country,
  delete_country_by_condition
};
