/* jshint esversion: 6 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{ 
        type: String,
        required: true
    },
    facebookid:{
        type: Number,
        required: true
    },
    email:{ 
        type: String,
        required: true
    },
    estilo:{ 
        type: String,
        required: true
    },
    equiposFavoritos:{ 
        type: [String],
        required: true
    },
    jugadoresFavoritos:{ 
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);