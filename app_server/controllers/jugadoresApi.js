/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Jugador = mongoose.model('jugadores');

const getJugadores = function (req, res) {
	Jugador
		.find()
		.exec((err, jugadores) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(jugadores);
			}
		});
};

module.exports = {
	getJugadores
};