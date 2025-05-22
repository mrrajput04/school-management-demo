const errorHandler = (err, req, res, next) => {
	// Log the error for debugging
	console.error(err.stack);

	// Default error status and message
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	// Custom error response
	res.status(status).json({
		success: false,
		status,
		message,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack })
	});
};

// Custom error class for API errors
class APIError extends Error {
	constructor(message, status = 400) {
		super(message);
		this.status = status;
		this.name = 'APIError';
	}
}

module.exports = {
	errorHandler,
	APIError
};