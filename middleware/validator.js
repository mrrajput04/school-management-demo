const { body, query, validationResult } = require('express-validator');

// Utility function to handle validation results
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array().map(err => ({
				field: err.param,
				message: err.msg
			}))
		});
	}
	next();
};

// Validation rules for adding a school
const validateAddSchool = [
	body('name')
		.trim()
		.notEmpty()
		.withMessage('School name is required')
		.isLength({ min: 2, max: 100 })
		.withMessage('School name must be between 2 and 100 characters'),

	body('address')
		.trim()
		.notEmpty()
		.withMessage('School address is required')
		.isLength({ min: 5, max: 200 })
		.withMessage('Address must be between 5 and 200 characters'),

	body('phone')
		.trim()
		.notEmpty()
		.withMessage('Phone number is required')
		.matches(/^\+?[\d\s-]+$/)
		.withMessage('Please enter a valid phone number'),

	body('email')
		.trim()
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please enter a valid email address')
		.normalizeEmail(),

	// Apply the validation
	handleValidationErrors
];

// Validation rules for listing schools
const validateListSchools = [
	query('page')
		.optional()
		.isInt({ min: 1 })
		.withMessage('Page must be a positive integer')
		.toInt(),

	query('limit')
		.optional()
		.isInt({ min: 1, max: 100 })
		.withMessage('Limit must be between 1 and 100')
		.toInt(),

	query('search')
		.optional()
		.trim()
		.isLength({ min: 2 })
		.withMessage('Search term must be at least 2 characters long'),

	// Apply the validation
	handleValidationErrors
];

module.exports = {
	validateAddSchool,
	validateListSchools
};