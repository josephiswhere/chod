const db = require('../models/cheftasticModels');

const eventController = {};

// createEvent(date, mealID)
eventController.createEvent = (req, res, next) => {
  const { date, mealID } = req.body;
  const text = 'INSERT INTO events (date, meal_id) VALUES ($1, $2)';
  const values = [ date, mealID ];
  db.query(text, values).then((resp) => {
    return next();
  }).catch((err) => {
    next({
      log: `Error in createEvent middleware: ${err}`,
      message: { err: 'An error occurred' },
    })
  })
};

module.exports = eventController;