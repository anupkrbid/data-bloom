const express = require('express');

const {
  signUp,
  signIn,
  signOut,
  isEmailAvailable
} = require('../controllers/auth');
const {
  isAuthenticated,
  isValidSignUpRequest,
  isValidSignInRequest
} = require('../middlewares/auth');

const router = express.Router();

router.post('/sign-up', isValidSignUpRequest, signUp);
router.post('/sign-in', isValidSignInRequest, signIn);
router.post('/sign-out', isAuthenticated, signOut);
router.post('/email-available', isEmailAvailable);
// router.post('/forgot-password', AuthController.forgotPassword);
// router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
