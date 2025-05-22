/**
 * Calculate the distance between two geographic coordinates using the haversine formula
 * @param {number} lat1 - Latitude of the first point in degrees
 * @param {number} lng1 - Longitude of the first point in degrees
 * @param {number} lat2 - Latitude of the second point in degrees
 * @param {number} lng2 - Longitude of the second point in degrees
 * @returns {number} - Distance in kilometers
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
	// Convert latitude and longitude from degrees to radians
	const toRadians = (degrees) => degrees * (Math.PI / 180);

	const radLat1 = toRadians(lat1);
	const radLng1 = toRadians(lng1);
	const radLat2 = toRadians(lat2);
	const radLng2 = toRadians(lng2);

	// Radius of the Earth in kilometers
	const earthRadius = 6371;

	// Haversine formula
	const dLat = radLat2 - radLat1;
	const dLng = radLng2 - radLng1;

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(radLat1) * Math.cos(radLat2) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = earthRadius * c;

	return distance;
};

module.exports = {
	calculateDistance
};