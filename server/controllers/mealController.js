const db = require('../models/cheftasticModels');

const mealController = {};

// createMeal(name, description, chefID)
mealController.createMeal = (req, res, next) => {
  const { name, description, chefID } = req.body;
  const text = 'INSERT INTO meals (name, description, chef_id) VALUES ($1, $2, $3)';
  const values = [ name, description, chefID ];
  db.query(text, values).then((resp) => {
    return next();
  }).catch((err) => {
    next({
      log: `Error in createMeal middleware: ${err}`,
      message: { err: 'An error occurred' },
    })
  })
};

module.exports = mealController;
