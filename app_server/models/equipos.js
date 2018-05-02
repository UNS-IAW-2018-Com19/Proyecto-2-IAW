/* jshint esversion: 6 */

const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  id_equipo: {
    type: Number,
    required: true
  },
  id_jugadorUno: {
    type: Number,
    required: true
  },
  id_jugadorDos: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  logo:{
    type: String,
    required: true
  }
});


mongoose.model('Equipo', equipoSchema);