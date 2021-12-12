const express = require('express');
const router = express.Router();
const { login } = require('../controller/users.js');

// localhost:8080/users

router.post('/login', login);

module.exports = router;
