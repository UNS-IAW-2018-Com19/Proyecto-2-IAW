/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Carrera = mongoose.model('Carrera');

const getCarreras = function (req, res) {
	Carrera
		.find()
		.exec((err, carreras) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(carreras);
			}
		});
};

module.exports = {
	getCarreras
};