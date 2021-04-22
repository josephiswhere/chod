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
    mealID: res.locals.mealID._id,
  });
});

// createEvent(date, mealID)
router.post('/events', eventController.createEvent, (req, res) => {
  return res.status(200).json({
    message: 'Event created.',
  });
});

// createSubscription(eventID, userID)
router.post('/subs',
  subscriptionController.createSubscription,
  eventController.decreaseSlots, (req, res) => {
    return res.status(200).json({
      message: 'Subscription created.',
   });
});

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSID,
  sessionController.startSession,
  (req, res) => {
    //check if login succeeded
    if (res.locals.loggedIn) {
      //send message let access
      const { name, _id } = res.locals.userInfo;
      return res.status(200).json({
        message: 'Login successful',
        loggedIn: true,
        id: _id,
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

router.get(
  '/chefevents',
  userController.checkChef,
  eventController.getChefEvents,
  (req, res) => {
    const isChef = res.locals.isChef.is_chef;
    if (isChef) {
      return res.status(200).json(res.locals.events);
    } else {
      return res
        .status(403)
        .json({ message: 'Invalid permissions.'});
    }
  }
);

router.get(
  '/allevents',
  eventController.getAllEvents,
  (req, res) => {
    return res.status(200).json(res.locals.events);
  }
);

// access user subscriptions
router.get('/subs', subscriptionController.getSubs, (req, res) => {
  return res.status(200).json(res.locals.subs);
});

router.get('/meals', mealController.getMeals, (req, res) => {
  return res.status(200).json(res.locals.meals);
});

module.exports = router;
