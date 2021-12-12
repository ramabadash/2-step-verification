const express = require('express');
const router = express.Router();
const { login, TwoStepVerification } = require('../controller/users.js');

// localhost:8080/users

router.post('/login', login);
router.post('/change-verification', TwoStepVerification);

module.exports = router;
