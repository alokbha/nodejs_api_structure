const express = require('express');
const { customerSearchController } = require('../Controller/customerSearchController.js');
const router = express.Router();

router.get('/search', customerSearchController);

module.exports = router;