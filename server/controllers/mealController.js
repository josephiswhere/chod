const db = require('../models/cheftasticModels');

const mealController = {};

// createMeal(name, description, chefID)
mealController.createMeal = (req, res, next) => {
  console.log(mealController.createMeal);
  const { name, description, chefID } = req.body;

console.log(55555, name, description, chefID)

  const text =
    'INSERT INTO meals (name, description, chef_id) VALUES ($1, $2, $3) RETURNING _id';
  const values = [name, description, chefID];
  db.query(text, values)
    .then((resp) => {
      res.locals.mealID = resp.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createMeal middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = mealController;
