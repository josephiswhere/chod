const db = require('../models/cheftasticModels');

const userController = {};

userController.checkUserExists = (req, res, next) => {
  console.log('userController.checkUserExists');
  const { username } = req.body;
  const text = 'SELECT username FROM users WHERE username = ($1)';
  const values = [username];
  db.query(text, values)
    .then((resp) => {
      if (resp.rows.length) res.locals.userExists = true;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in checkUsername middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

//TODO - convert password to bcrypt
userController.createUser = (req, res, next) => {
  console.log('userController.createUser');
  if (res.locals.userExists) return next();
  const { email, username, password, isChef, name } = req.body;
  const text =
    'INSERT INTO users (email, username, password, is_chef, name, bio) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [email, username, password, isChef, name, 'No Bio.'];
  db.query(text, values)
    .then((resp) => {
      res.locals.userAdded = true;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in createUser middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

userController.verifyUser = (req, res, next) => {
  console.log('userController.verifyUser');
  const { username, password } = req.body;
  const text =
    'SELECT _id, name FROM users WHERE username = ($1) AND password = ($2)';
  const values = [username, password];
  db.query(text, values)
    .then((resp) => {
      if (resp.rows.length) {
        res.locals.loggedIn = true;
        res.locals.userInfo = resp.rows[0];
        return next();
      }
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in verifyUser middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

// check isChef is truthy
// query users table for userID, store isChef to res.locals
userController.checkChef = (req, res, next) => {
  console.log('userController.checkChef');
  console.log(req.cookies);
  const { userid } = req.cookies;
  const text = 'SELECT is_chef FROM users WHERE _id = ($1)';
  const values = [userid];
  db.query(text, values)
    .then((resp) => {
      res.locals.isChef = resp.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in checkChef middleware: ${err}`,
        message: { err: 'An error occurred' },
      });
    });
};

module.exports = userController;
