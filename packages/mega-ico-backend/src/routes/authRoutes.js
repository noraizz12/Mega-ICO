const express = require("express");
const router = express.Router();
const user = require("../controllers/userAuthentication");
const validationMiddleware = require("../middlewares/validationMiddlewares");
const middleware = require("../middlewares/authMiddleware");

// Auth Routes

// user Login
router.post("/auth/login", ...validationMiddleware.login, user.userLogin);

// register user
router.post(
  "/auth/signup",
  ...validationMiddleware.register,
  user.userRegister
);

// verify email after registering user
router.post(
  "/auth/verify/email",
  ...validationMiddleware.verifyEmail,
  user.verifyEmail
);

// Get loggedIn User detail
router.get(
  "/users/me",
  middleware.auth(["user", "admin"]),
  user.getLoggedInUserdetail
);

// forgot password
router.post(
  "/auth/password/forgot",
  ...validationMiddleware.forgotPassword,
  user.forgotPassword
);

// reset passowrd
router.post(
  "/auth/password/reset",
  ...validationMiddleware.resetPassword,
  user.resetPassword
);

// Verifies Token generated by google authenticator app
router.post(
  "/auth/verify2fa",
  ...validationMiddleware.verify2FaToken,
  user.verify2FAtoken
);

// user Update Email Verification Status // useless yet
router.put(
  "/auth/updateEmailVerification",
  middleware.auth(),
  user.updateEmailVerificationStatus
);

// user Verify SMS/Email Verification code // useless yet
router.post("/auth/verifyEmailSMSVerification", user.verifySMSAndEmailCode);

// user Update SMS Verification Status // useless yet
router.put(
  "/auth/updateSMSVerification",
  middleware.auth(),
  user.updateSMSVerificationStatus
);

// user Verify SMS Verification code // useless yet
router.post("/auth/verifySMSVCode", user.verifySMSCode);

module.exports = router;