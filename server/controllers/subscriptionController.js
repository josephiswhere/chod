const db = require('../models/cheftasticModels');

const subscriptionController = {};

// createSubscription(eventID, userID)
subscriptionController.createSubscription = (req, res, next) => {
  console.log('subscriptionController.createSubscription');
  const { userID, eventID } = req.body;
  const text = 'INSERT INTO subscriptions (user_id, event_id) VALUES ($1, $2)';
  const values = [userID, eventID];
  db.query(text, values)
    .then((resp) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createSubscription middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

subscriptionController.getSubs = (req, res, next) => {
  console.log('subscriptionController.getSub');
  const { userid } = req.cookies;
  const text = `SELECT date, m.name, description, u.name
                AS chef FROM subscriptions s
                JOIN events e ON s.event_id = e._id
                JOIN meals m ON e.meal_id = m._id
                JOIN users u ON u._id = m.chef_id
                WHERE s.user_id = ($1)`;
  const values = [userid];
  db.query(text, values)
    .then((resp) => {
      res.locals.subs = resp.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in getSubs middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = subscriptionController;
