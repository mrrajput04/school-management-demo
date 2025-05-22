const express = require('express');
const controllers = require('./controllers');
const validators = require('./validators');

const router = express.Router();

// Add school endpoint
router.post('/addSchool', validators.validateAddSchool, controllers.addSchool);

// List schools endpoint
router.get('/listSchools', validators.validateListSchools, controllers.listSchools);

module.exports = router;
