const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const { validateTrip } = require('../middleware/validation.middleware');
const {
  create,
  getAll,
  getOne,
  remove,
  generate,
  updateActivityController,
  regenerateDayController
} = require('../controllers/trip.controller');

router.use(authMiddleware);

router.post('/', validateTrip, create);
router.get('/', getAll);
router.get('/:tripId', getOne);
router.delete('/:tripId', remove);
router.post('/:tripId/generate', generate);
router.patch('/:tripId/itinerary/days/:dayNumber/activities', updateActivityController);
router.post('/:tripId/itinerary/days/:dayNumber/regenerate', regenerateDayController);

module.exports = router;