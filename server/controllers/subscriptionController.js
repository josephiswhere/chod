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

module.exports = subscriptionController;
