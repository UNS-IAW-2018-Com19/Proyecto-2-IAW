/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Equipo = mongoose.model('Equipo');
const User = mongoose.model('users');

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

const getEquiposFavoritos = function (req, res) {
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
					.json(user.equiposFavoritos);
					
			}
		});
};

const saveEquiposFavoritos = function (req, res) {
	User
	   .update({facebookid: req.user.facebookid}, {equiposFavoritos: req.body.equiposFavoritos}, 
		   {upsert: true, setDefaultsOnInsert: true}, (err, equiposFavoritos) => {
			   if (err) { 
				   res
					   .status(400)
					   .json(err);    
			   } else {
				   res
					   .status(201)
					   .json(equiposFavoritos);
			   }
		   });
};





module.exports = {
	getEquipos, saveEquiposFavoritos, getEquiposFavoritos
};