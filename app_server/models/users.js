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
    },
    estilo:{ 
        type: String,
    },
    equiposFavoritos:{ 
        type: [String],
    },
    jugadoresFavoritos:{ 
        type: [String],    
    },
    photo:{ 
        type: String    
    }
});

module.exports = mongoose.model('users', userSchema);