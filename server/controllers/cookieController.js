const db = require('../models/cheftasticModels');

const cookieController = {};

cookieController.setSSID = (req, res, next) => {
  console.log('cookieController.setSSID');
  if (res.locals.loggedIn) {
    const { _id } = res.locals.userInfo;
    res.cookie('userID', _id); // TODO - convert to JWT
    return next();
  }
  return next();
};

module.exports = cookieController;
