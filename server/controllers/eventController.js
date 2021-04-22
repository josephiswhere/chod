const db = require('../models/cheftasticModels');

const eventController = {};

// createEvent(date, mealID)
eventController.createEvent = (req, res, next) => {
  console.log('eventController.createEvent');
  const { date, mealID, slots } = req.body;
  const text = 'INSERT INTO events (date, meal_id, slots) VALUES ($1, $2, $3)';
  const values = [date, mealID, slots];
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

eventController.getChefEvents = (req, res, next) => {
  console.log('eventController.getEvents');
  const { userID } = req.cookies;
  const isChef = res.locals.isChef.is_chef;

  if (isChef) {
    const text = `SELECT
                  e._id AS eventID, date, m.name AS meal, m.description, slots
                  FROM events e
                  JOIN meals m ON e.meal_id = m._id
                  JOIN users u ON m.chef_id = u._id
                  WHERE m.chef_id = ($1)
                  ORDER BY date`;
    values = [userID];
    db.query(text, values)
      .then((resp) => {
        res.locals.events = resp.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in getChefEvents middleware: ${err}`,
          message: { err: 'An error occurred' },
        });
      });
  } else return next();
};

eventController.getAllEvents = (req, res, next) => {
    const text = `SELECT
                  e._id AS eventID, date, m.name AS meal, m.description, u.name AS chef, slots
                  FROM events e
                  JOIN meals m ON e.meal_id = m._id
                  JOIN users u ON m.chef_id = u._id
                  ORDER BY date`;
    db.query(text)
      .then((resp) => {
        res.locals.events = resp.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in getAllEvents middleware: ${err}`,
          message: { err: 'An error occurred' },
        });
      });
};

eventController.decreaseSlots = (req, res, next) => {
  const { eventID } = req.body;
    // if adding a subscription, decrease slots available
    const text = `UPDATE events 
                  SET slots = slots - 1
                  WHERE events._id = ($1)`;
    const values = [ eventID ];
    db.query(text, values)
      .then((resp) => {
        res.locals.events = resp.rows;
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in decreaseSlots middleware: ${err}`,
          message: { err: 'An error occurred' },
        });
      }); 
};

module.exports = eventController;
