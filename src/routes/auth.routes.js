const express = require('express');
const router = express.Router();
const { validateRegister } = require('../middleware/validation.middleware');
const {
  registerController,
  loginController,
  refreshController,
  logoutController
} = require('../controllers/auth.controller');

router.post('/register', validateRegister, registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController);
router.post('/logout', logoutController);

module.exports = router;