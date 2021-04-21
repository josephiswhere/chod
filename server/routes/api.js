const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const mealController = require('../controllers/mealController');
const eventController = require('../controllers/eventController');
const subscriptionController = require('../controllers/subscriptionController');

// createUser(name, password, isChef)
router.post(
  '/users',
  userController.checkUserExists,
  userController.createUser,
  (req, res) => {
    if (res.locals.userExists) {
      return res.status(409).json({
        message: 'Username already exists.',
      });
    } else {
      return res.status(200).json({
        message: 'User created.',
      });
    }
  }
);

// createMeal(name, description, chefID)
router.post('/meals', mealController.createMeal, (req, res) => {
  return res.status(200).json({
    message: 'Meal created.',
  });
});

// createEvent(date, mealID)
router.post('/events', eventController.createEvent, (req, res) => {
  return res.status(200).json({
    message: 'Event created.',
  });
});

// createSubscription(eventID, userID)
router.post('/subs', subscriptionController.createSubscription, (req, res) => {
  return res.status(200).json({
    message: 'Subscription created.',
  });
});

// on login
// verify user - userController
// checking usernam
// checking password
// set session cookie - cookieController
// start session - sessionController

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSID,
  sessionController.startSession,
  (req, res) => {
    //check if login succeeded
    if (res.locals.loggedIn) {
      //send message let access
      const { name } = res.locals.userInfo;
      return res.status(200).json({
        message: 'Login successful',
        loggedIn: true,
        name,
      });
    } else {
      //send message, dont let access
      return res
        .status(401)
        .json({ message: 'Invalid login.', loggedIn: false });
    }
  }
);

router.get('/', (req, res) => {
  return res.status(200).send('<h1>testing</h1>');
});

// USERS
// create user - name/password/ischef
// log in - stretch - session data?
// add bio
//--
//X createUser(name, password, isChef)
// logIn(name, password)
// addBio(userID, bio)

// MEALS
// create meal - name/description/chef_id(auto)
// Remove - Meal_ID
//--
//X createMeal(name, description, chefID)
// getMeals(chefID)
// removeMeal(mealID)

// EVENT
//X create event - Date/Meal_ID
// Remove - Event_ID
//--
// createEvent(date, mealID)
// removeEvent(eventID)
// getEvents()

// SUBSCRIPTIONS
//X Subscribe - Event_ID/User_ID
// Unsubscribe - ''
//--
// createSubscription(eventID, userID)
// removeSubscription(subscriptionID)

module.exports = router;
