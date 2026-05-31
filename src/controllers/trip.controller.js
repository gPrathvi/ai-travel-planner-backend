const {
  createTrip,
  getAllTrips,
  getTripById,
  deleteTrip,
  generateItinerary,
  updateActivity,
  regenerateDayService
} = require('../services/trip.service');

const create = async (req, res, next) => {
  try {
    const trip = await createTrip({ userId: req.userId, ...req.body });
    res.status(201).json({ success: true, data: trip });
  } catch (error) { next(error); }
};

const getAll = async (req, res, next) => {
  try {
    const trips = await getAllTrips(req.userId);
    res.json({ success: true, data: trips });
  } catch (error) { next(error); }
};

const getOne = async (req, res, next) => {
  try {
    const data = await getTripById(req.params.tripId, req.userId);
    res.json({ success: true, data });
  } catch (error) { next(error); }
};

const remove = async (req, res, next) => {
  try {
    await deleteTrip(req.params.tripId, req.userId);
    res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) { next(error); }
};

const generate = async (req, res, next) => {
  try {
    const itinerary = await generateItinerary(req.params.tripId, req.userId);
    res.json({ success: true, data: itinerary });
  } catch (error) { next(error); }
};

const updateActivityController = async (req, res, next) => {
  try {
    const itinerary = await updateActivity(
      req.params.tripId,
      req.userId,
      req.params.dayNumber,
      req.body
    );
    res.json({ success: true, data: itinerary });
  } catch (error) { next(error); }
};

const regenerateDayController = async (req, res, next) => {
  try {
    const itinerary = await regenerateDayService(
      req.params.tripId,
      req.userId,
      req.params.dayNumber,
      req.body.instruction
    );
    res.json({ success: true, data: itinerary });
  } catch (error) { next(error); }
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  generate,
  updateActivityController,
  regenerateDayController
};