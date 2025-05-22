/**
 * Validate add school request
 */
const validateAddSchool = (req, res, next) => {
	const { name, address, latitude, longitude } = req.body;

	// Check if all required fields are present
	if (!name || !address || latitude === undefined || longitude === undefined) {
		return res.status(400).json({
			success: false,
			message: 'Missing required fields',
			requiredFields: ['name', 'address', 'latitude', 'longitude']
		});
	}

	// Validate name and address
	if (typeof name !== 'string' || name.trim() === '') {
		return res.status(400).json({
			success: false,
			message: 'Invalid name: must be a non-empty string'
		});
	}

	if (typeof address !== 'string' || address.trim() === '') {
		return res.status(400).json({
			success: false,
			message: 'Invalid address: must be a non-empty string'
		});
	}

	// Validate latitude and longitude
	const lat = parseFloat(latitude);
	const lng = parseFloat(longitude);

	if (isNaN(lat) || lat < -90 || lat > 90) {
		return res.status(400).json({
			success: false,
			message: 'Invalid latitude: must be a number between -90 and 90'
		});
	}

	if (isNaN(lng) || lng < -180 || lng > 180) {
		return res.status(400).json({
			success: false,
			message: 'Invalid longitude: must be a number between -180 and 180'
		});
	}

	// All validations passed, proceed to the controller
	next();
};

/**
 * Validate list schools request
 */
const validateListSchools = (req, res, next) => {
	const { latitude, longitude } = req.query;

	// Check if latitude and longitude are provided
	if (!latitude || !longitude) {
		return res.status(400).json({
			success: false,
			message: 'Missing required query parameters',
			requiredParams: ['latitude', 'longitude']
		});
	}

	// Validate latitude and longitude
	const lat = parseFloat(latitude);
	const lng = parseFloat(longitude);

	if (isNaN(lat) || lat < -90 || lat > 90) {
		return res.status(400).json({
			success: false,
			message: 'Invalid latitude: must be a number between -90 and 90'
		});
	}

	if (isNaN(lng) || lng < -180 || lng > 180) {
		return res.status(400).json({
			success: false,
			message: 'Invalid longitude: must be a number between -180 and 180'
		});
	}

	// All validations passed, proceed to the controller
	next();
};

module.exports = {
	validateAddSchool,
	validateListSchools
};
