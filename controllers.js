const db = require('./db');
const utils = require('./utils');

/**
 * Add a new school to the database
 */
const addSchool = async (req, res) => {
	try {
		const { name, address, latitude, longitude } = req.body;

		// Insert the school data into the database
		const [result] = await db.pool.query(
			'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
			[name, address, latitude, longitude]
		);

		// Check if the insertion was successful
		if (result.affectedRows !== 1) {
			return res.status(500).json({
				success: false,
				message: 'Failed to add school'
			});
		}

		// Return success response
		return res.status(201).json({
			success: true,
			message: 'School added successfully',
			data: {
				id: result.insertId,
				name,
				address,
				latitude,
				longitude
			}
		});
	} catch (error) {
		console.error('Error adding school:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: process.env.NODE_ENV === 'production' ? {} : error.message
		});
	}
};

/**
 * List all schools sorted by proximity to the user's location
 */
const listSchools = async (req, res) => {
	try {
		const { latitude, longitude } = req.query;

		// Convert string parameters to numbers
		const userLat = parseFloat(latitude);
		const userLng = parseFloat(longitude);

		// Fetch all schools from the database
		const [schools] = await db.pool.query('SELECT * FROM schools');

		// Calculate distance and sort schools by proximity
		const schoolsWithDistance = schools.map(school => {
			const distance = utils.calculateDistance(
				userLat, userLng,
				school.latitude, school.longitude
			);

			return {
				...school,
				distance: distance
			};
		});

		// Sort schools by distance (closest first)
		schoolsWithDistance.sort((a, b) => a.distance - b.distance);

		// Return sorted schools
		return res.status(200).json({
			success: true,
			message: 'Schools retrieved successfully',
			data: schoolsWithDistance
		});
	} catch (error) {
		console.error('Error listing schools:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: process.env.NODE_ENV === 'production' ? {} : error.message
		});
	}
};

module.exports = {
	addSchool,
	listSchools
};