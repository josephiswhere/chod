const db = require('../models/cheftasticModels');

const mealController = {};

// createMeal(name, description, chefID)
mealController.createMeal = (req, res, next) => {
  // console.log('mealController.createMeal');
  const { name, description, chefID } = req.body;
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

mealController.getMeals = (req, res, next) => {
  // console.log('mealController.getMeals');
  const { userid } = req.cookies;
  const text =
    'SELECT meal._id AS meadID, name, description FROM meals WHERE chef_id = ($1)';
  const values = [userid];
  db.query(text, values)
    .then((resp) => {
      res.locals.meals = resp.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getMeals middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = mealController;
