
const checkInputValidation = (req, res, next) => {
    const { name, alpha2Code, alpha3Code, visited } = req.body;
    if (!name || !alpha2Code || !alpha3Code || !visited)

    return res
      .status(400)
      .send("Please provide values for name, alpha2Code, alpha3Code, visited");
      
    next();
}

module.exports = checkInputValidation;