/* jshint esversion: 6*/
const mongoose = require('mongoose');
const User = mongoose.model('users');


const getEstilo = function (req, res) {
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
					.json(user.estilo);
					
			}
		});
};


const saveEstilo = function (req, res) {
     User
		.update({facebookid: req.user.facebookid}, {username: req.user.username, estilo: req.body.estilo}, 
			{upsert: true, setDefaultsOnInsert: true}, (err, estilo) => {
				if (err) { 
					res
						.status(400)
						.json(err);    
	        	} else {
					res
						.status(201)
						.json(estilo);
				}
			});
};




module.exports = {
	saveEstilo, getEstilo
};

