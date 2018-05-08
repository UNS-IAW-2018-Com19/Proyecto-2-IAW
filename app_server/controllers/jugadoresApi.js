/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Jugador = mongoose.model('jugadores');
const User = mongoose.model('users');

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

const getJugadoresFavoritos = function (req, res) {
	User
		.findOne({'facebookid': req.user.facebookid})
		.exec((err, user) => {
			if (err || !user) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(user.jugadoresFavoritos);
					
			}
		});
};

const saveJugadoresFavoritos = function (req, res) {
	User
	   .update({facebookid: req.user.facebookid}, {jugadoresFavoritos: req.body.jugadoresFavoritos}, 
		   {upsert: true, setDefaultsOnInsert: true}, (err, jugadoresFavoritos) => {
			   if (err) { 
				   res
					   .status(400)
					   .json(err);    
			   } else {
				   res
					   .status(201)
					   .json(jugadoresFavoritos);
			   }
		   });
};

module.exports = {
	getJugadores, saveJugadoresFavoritos, getJugadoresFavoritos
};