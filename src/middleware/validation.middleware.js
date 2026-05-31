const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }

  next();
};

const validateTrip = (req, res, next) => {
  const { destination, days, budgetType, interests } = req.body;

  if (!destination || !days || !budgetType || !interests) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  if (days < 1 || days > 30) {
    return res.status(400).json({
      success: false,
      message: 'Days must be between 1 and 30'
    });
  }

  if (!['low', 'medium', 'high'].includes(budgetType)) {
    return res.status(400).json({
      success: false,
      message: 'Budget type must be low, medium or high'
    });
  }

  next();
};

module.exports = { validateRegister, validateTrip };