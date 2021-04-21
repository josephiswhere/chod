const db = require('../models/cheftasticModels');

const eventController = {};

// createEvent(date, mealID)
eventController.createEvent = (req, res, next) => {
  console.log('eventController.createEvent');
  const { date, mealID } = req.body;
  const text = 'INSERT INTO events (date, meal_id) VALUES ($1, $2)';
  const values = [date, mealID];
  db.query(text, values)
    .then((resp) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createEvent middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

eventController.getEvents = (req, res, next) => {
  console.log('eventController.getEvents', res.locals.isChef);
  // const { ssid } = req.cookies;
  const ssid = 2;
  const isChef = res.locals.isChef.is_chef;

  if (isChef) {
    const text = `SELECT date, m.name AS meal, m.description
                         FROM events e
                         JOIN meals m ON e.meal_id = m._id
                         JOIN users u ON m.chef_id = u._id
                         WHERE m.chef_id = ($1)
                         ORDER BY date`
    values = [ ssid ];
    db.query(text, values).then((resp) => {
      res.locals.events = resp.rows;
      console.log(res.locals.events);
      return next();
    }).catch((err) => {
      return next({
        log: `Error in getEvent:Chef middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
  } else {
    const text =`SELECT
                 date, m.name AS meal, m.description, u.name AS chef
                 FROM events e
                 JOIN meals m ON e.meal_id = m._id
                 JOIN users u ON m.chef_id = u._id
                 ORDER BY date`
    db.query(text).then((resp) => {
      res.locals.events = resp;
      return next();
    }).catch((err) => {
      return next({
        log: `Error in getEvent:Guest middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
  }
}




// get event for chefs - query the events table
// show events the chef is only providing
// query- merge meals into events into users where chefID = userID
// save to res.locals

// get event for users - query the events table
// show all the events from all chefs
// query- merge meals into events into users *
// save to res.locals


// filter data back to front - building an array of objects and each holds event date, meal name, description and chef name



module.exports = eventController;
