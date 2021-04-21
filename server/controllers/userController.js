const db = require('../models/cheftasticModels');

const userController = {};

userController.checkUserExists = (req, res, next) => {
  const { username } = req.body;
  const text = 'SELECT username FROM users WHERE username = ($1)';
  const values = [ username ];
  
  //db.query(text, values).then((resp) => {
  db.query(text, values)
  .then((resp) => {
    console.log(666666, resp.rows)   
    if (resp.rows.length) res.locals.userExists = true;
    return next();
  }).catch((err) => {
    console.log(777777, err)
   
    next({
        log: `Error in checkUsername middleware: ${err}`,
        message: { err: 'An error occurred' },
      })
    })  
}

userController.createUser = (req, res, next) => {
  if (res.locals.userExists) return next();

  const { email, username, password, isChef, name } = req.body;
  const text = 'INSERT INTO users (email, username, password, is_chef, name, bio) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [ email, username, password, isChef, name, 'No Bio.' ];
  db.query(text, values).then((resp) => {
    res.locals.userAdded = true;
    return next();
  }).catch((err) => {
    next({
      log: `Error in createUser middleware: ${err}`,
      message: { err: 'An error occurred' },
    })
  })  
}


module.exports = userController;