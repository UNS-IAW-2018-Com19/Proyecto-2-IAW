/* jshint esversion: 6 */
const mongoose = require('mongoose');

const jugadorSchema = new mongoose.Schema({
    id_jugador: {
      type: Number,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    id_equipo: {
      type: Number,
      required: true
    },
    personaje: {
      type: String,
      required: true
    },
    fotopersonaje: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    vehiculo: {
      kart:{
        type: String,
        required: true
      },
      ruedas:{
        type: String,
        required: true
      },
      glider:{
        type: String,
        required: true
      },
    }

});

mongoose.model('jugadores', jugadorSchema);
