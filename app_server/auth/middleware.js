/* jshint esversion: 6 */
const isAuthenticated = function(req, res, next) {
	// CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
	// you can do this however you want with whatever variables you set up
	if (req.isAuthenticated())
		return next();

	res
		.status(304)
		.json({'warning': 'not modified'});
}

module.exports = isAuthenticated;