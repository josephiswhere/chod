const db = require('../models/cheftasticModels');

const sessionController = {};

// start a session - on create account AND login
// verify session - on page loads

sessionController.startSession = (req, res, next) => {
  console.log('sessionController.startSession');
  if (res.locals.loggedIn) {
    const sessionLength = '10 minutes';
    const { _id } = res.locals.userInfo;
    const queryString = `INSERT INTO sessions (cookie_id, expires_by) VALUES (${_id}, NOW() + interval '${sessionLength}')`;
    db.query(queryString)
      .then(() => {
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in createEvent middleware: ${err}`,
          message: { err: 'An error occurred' },
        });
      });
  } else return next();
};

module.exports = sessionController;
