const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: 'Internal Server Error',
		error: process.env.NODE_ENV === 'production' ? {} : err
	});
});

// Start the server
const startServer = async () => {
	try {
		await db.connect();
		console.log('Connected to MySQL database');

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Failed to connect to the database:', error);
		process.exit(1);
	}
};

startServer();
