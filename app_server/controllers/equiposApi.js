/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Equipo = mongoose.model('Equipo');

const getEquipos = function (req, res) {
	Equipo	
		.find()
		.exec((err, equipos) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(equipos);
			}
		});
};



module.exports = {
	getEquipos,
};