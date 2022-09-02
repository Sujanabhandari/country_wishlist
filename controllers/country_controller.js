const Country = require("../models/Country");
const { body, validationResult } = require('express-validator');


const get_countries_list = async (req, res, next) => {

  const condition = req.query;
  
  try {
   
    const allCountries = await Country.find(condition).sort({name: 1});

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

const add_new_Country= async (req, res, next) => {
  console.log(req);
  const { name, alpha2Code, alpha3Code } = req.body;
  console.log(req.body);


  if (!name || !alpha2Code || !alpha3Code)
    return res
      .status(400)
      .send("Please provide values for name, alpha2Code and alpha3Code");

  try {
   
    const newCountry = await Country.create({name, alpha2Code, alpha3Code});
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

    const foundCounty = await Country.find({ $or: [ { alpha2Code: code }, { alpha3Code: code } ] }) ;
    
    if (foundCounty.length == 0)
      return res.status(404).send(`<h1>The country with this code ${code} does not exist</h1>`);
      
    return res.status(200).send(foundCounty);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// const update_all_field_of_student = async(req, res, next) => {
  
//   const { id } = req.params;
//   console.log(req.body);

 
//   try{
//     const updatedStudent = await Student.findByIdAndUpdate(id, req.body,
//       { new: true });
//     return res.status(200).send(updatedStudent)
//   }
//   catch(err) {
//     console.log(err);
//     next(err)
//   }

// }
// const update_one_field_of_student = async(req, res, next) => {
  
//   const { id } = req.params;
//   const { name, first_name, email} = req.body;

//   const condition = Object.entries(req.body);
//   //if there is no body
//   if(!condition.length) return res
//   .status(400)
//   .send("Please provide a condition for your update operation");

//   //if there is a body
//   const [[key, value]] = condition;

//   try{
//     const updatedStudent = await Student.findByIdAndUpdate(id, {
//       name, first_name, email
//     },
//       { new: true });
//     return res.status(200).send(updatedStudent)
//   }
//   catch(err) {
//     console.log(err);
//     next(err)
//   }

// }
module.exports = {
  add_new_Country,
  get_countries_list,
  retrieve_student_by_code
    // update_all_field_of_student,
    // update_one_field_of_student

};
