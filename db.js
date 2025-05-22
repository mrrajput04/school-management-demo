const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_NAME || 'school_management'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database and create table if not exists
const connect = async () => {
	try {
		// Test database connection
		const connection = await pool.getConnection();
		console.log('Connected to MySQL server');

		// Create schools table if it doesn't exist
		await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
		console.log('Schools table initialized');

		connection.release();
		return true;
	} catch (error) {
		console.error('Database connection error:', error);
		throw error;
	}
};

module.exports = {
	connect,
	pool
};