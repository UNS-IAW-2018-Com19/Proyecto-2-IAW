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

const getComments = function (req, res) {
	console.log(req.body);
	console.log(req.body.fecha);
	Carrera
		.findOne({'fecha': req.body.fecha})
		.exec((err, carrera) => {
			if (err || !carrera) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(carrera.comentario);
				return carrera.comentario;	
			}
		});
};


const saveComments = function (req, res) {
	Carrera
	.findOne({'fecha': req.body.fecha})
	.update({fecha: req.body.fecha}, {comentario: req.body.comentario},
   			{upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
				if (err) { 
					res
						.status(400)
						.json(err);    
	        	} else {
					res
						.status(201)
						.json(comentario);
				}
			});
};

module.exports = {
	getCarreras, getComments, saveComments
};