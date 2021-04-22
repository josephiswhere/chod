const express = require('express');

const router = express.Router();

const cookieController = require('../controllers/cookieController');
const eventController = require('../controllers/eventController');
const mealController = require('../controllers/mealController');
const sessionController = require('../controllers/sessionController');
const subscriptionController = require('../controllers/subscriptionController');
const userController = require('../controllers/userController');

router.get('/allevents', eventController.getAllEvents, (req, res) => {
  return res.status(200).json(res.locals.events);
});

router.get(
  '/chefevents',
  userController.checkChef,
  eventController.getChefEvents,
  (req, res) => {
    const isChef = res.locals.isChef.is_chef;
    if (isChef) {
      return res.status(200).json(res.locals.events);
    } else {
      return res.status(403).json({ message: 'Invalid permissions.' });
    }
  }
);

router.post('/events', eventController.createEvent, (req, res) => {
  return res.status(200).json({
    message: 'Event created.',
  });
});

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSID,
  sessionController.startSession,
  (req, res) => {
    if (res.locals.loggedIn) {
      const { name, id } = res.locals.userInfo;
      return res.status(200).json({
        message: 'Login successful',
        loggedIn: true,
        id,
        name,
      });
    } else {
      return res
        .status(401)
        .json({ message: 'Invalid login.', loggedIn: false });
    }
  }
);

router.get('/meals', mealController.getMeals, (req, res) => {
  return res.status(200).json(res.locals.meals);
});

router.post('/meals', mealController.createMeal, (req, res) => {
  return res.status(200).json({
    message: 'Meal created.',
    mealID: res.locals.mealID._id,
  });
});

router.get('/subs', subscriptionController.getSubs, (req, res) => {
  return res.status(200).json(res.locals.subs);
});

router.post(
  '/subs',
  subscriptionController.createSubscription,
  eventController.decreaseSlots,
  (req, res) => {
    return res.status(200).json({
      message: 'Subscription created.',
    });
  }
);

router.delete(
  '/subs',
  eventController.increaseSlots,
  subscriptionController.deleteSubscription,
  (req, res) => {
    return res.status(200).json({ message: 'Subscription deleted.' });
  }
);

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

module.exports = router;
