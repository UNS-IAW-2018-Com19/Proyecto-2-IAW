/* jshint esversion: 6 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{ 
        type: String,
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

mongoose.model('users', userSchema);