const express = require('express');
const controllers = require('./controllers');
const validators = require('./middleware/validator');
const { errorHandler } = require('./middleware/errorHandler');

const router = express.Router();

// Add school endpoint with validation
router.post('/addSchool', validators.validateAddSchool, controllers.addSchool);

// List schools endpoint with validation
router.get('/listSchools', validators.validateListSchools, controllers.listSchools);

// Error handling middleware should be the last middleware to use
router.use(errorHandler);

module.exports = router;
