const Trip = require('../models/trip.model');
const Itinerary = require('../models/itinerary.model');
const { generateTripPlan, regenerateDay } = require('./ai.service');

const createTrip = async ({ userId, destination, days, budgetType, interests }) => {
const trip = await Trip.create({
userId,
destination,
days,
budgetType,
interests
});

return trip;
};

const getAllTrips = async (userId) => {
return await Trip.find({ userId }).sort({ createdAt: -1 });
};

const getTripById = async (tripId, userId) => {
const trip = await Trip.findOne({
_id: tripId,
userId
});

if (!trip) {
throw { status: 404, message: 'Trip not found' };
}

const itinerary = await Itinerary.findOne({ tripId });

return { trip, itinerary };
};

const deleteTrip = async (tripId, userId) => {
const trip = await Trip.findOneAndDelete({
_id: tripId,
userId
});

if (!trip) {
throw { status: 404, message: 'Trip not found' };
}

await Itinerary.findOneAndDelete({ tripId });

return trip;
};

const generateItinerary = async (tripId, userId) => {
const trip = await Trip.findOne({
_id: tripId,
userId
});

if (!trip) {
throw { status: 404, message: 'Trip not found' };
}

const result = await generateTripPlan({
destination: trip.destination,
days: trip.days,
budgetType: trip.budgetType,
interests: trip.interests
});

const itinerary = await Itinerary.findOneAndUpdate(
{ tripId },
{
tripId,
days: result.itinerary.days,
budgetBreakdown: result.budget,
hotels: result.hotels || [],
restaurants: result.restaurants || [],
updatedAt: Date.now()
},
{
upsert: true,
new: true
}
);

return itinerary;
};

const updateActivity = async (
tripId,
userId,
dayNumber,
{ action, activity, activityIndex }
) => {
const trip = await Trip.findOne({
_id: tripId,
userId
});

if (!trip) {
throw { status: 404, message: 'Trip not found' };
}

const itinerary = await Itinerary.findOne({ tripId });

if (!itinerary) {
throw { status: 404, message: 'Itinerary not found' };
}

const dayIndex = itinerary.days.findIndex(
d => d.day === parseInt(dayNumber)
);

if (dayIndex === -1) {
throw { status: 404, message: 'Day not found' };
}

if (action === 'add' && activity) {
itinerary.days[dayIndex].activities.push(activity);
} else if (
action === 'remove' &&
activityIndex !== undefined
) {
itinerary.days[dayIndex].activities.splice(
activityIndex,
1
);
} else {
throw { status: 400, message: 'Invalid action' };
}

itinerary.updatedAt = Date.now();

await itinerary.save();

return itinerary;
};

const regenerateDayService = async (
tripId,
userId,
dayNumber,
instruction
) => {
const trip = await Trip.findOne({
_id: tripId,
userId
});

if (!trip) {
throw { status: 404, message: 'Trip not found' };
}

const itinerary = await Itinerary.findOne({ tripId });

if (!itinerary) {
throw { status: 404, message: 'Itinerary not found' };
}

const result = await regenerateDay({
destination: trip.destination,
dayNumber: parseInt(dayNumber),
instruction,
budgetType: trip.budgetType,
interests: trip.interests
});

const dayIndex = itinerary.days.findIndex(
d => d.day === parseInt(dayNumber)
);

if (dayIndex !== -1) {
itinerary.days[dayIndex] = result;
} else {
itinerary.days.push(result);
}

itinerary.updatedAt = Date.now();

await itinerary.save();

return itinerary;
};

module.exports = {
createTrip,
getAllTrips,
getTripById,
deleteTrip,
generateItinerary,
updateActivity,
regenerateDayService
};
