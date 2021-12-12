const express = require('express');
const router = express.Router();
const { login, TwoStepVerification, validateTokenCode } = require('../controller/users.js');

// localhost:8080/users

router.post('/login', login);
router.post('/change-verification', TwoStepVerification);
router.post('/verification-login', validateTokenCode); //Login with app code

module.exports = router;
