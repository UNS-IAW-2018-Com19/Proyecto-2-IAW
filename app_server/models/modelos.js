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

const vehiculoSchema = new mongoose.Schema({
    kart: {
      type: String,
      required: true
    },
    ruedas: {
      type: String,
      required: true
    },
    glider: {
      type: String,
      required: true
    }
});

const jugadorSchema = new mongoose.Schema({
    id_jugador: {
      type: Number,
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
    vehiculo: vehiculoSchema
});

const posicionSchema = new mongoose.Schema({
    jugador: {
      type: Number,
      required: true
    },
    puntaje: {
      type: Number,
      required: true
    }
});

const carreraSchema = new mongoose.Schema({
    id_carrera: {
      type: Number,
      required: true
    },
    fecha: {
      type: Number,
      required: true
    },
    mapa: {
      type: String,
      required: true
    },
    fotoMapa: {
      type: String,
      required: true
    },
    vueltas: {
      type: Number,
      required: true
    },
    completada: {
      type: Boolean,
      required: true
    },
    posiciones: [posicionSchema]

});


mongoose.model('Equipo', equipoSchema);
mongoose.model('Vehiculo', vehiculoSchema);
mongoose.model('Jugador', jugadorSchema);
mongoose.model('Posicion', posicionSchema);
mongoose.model('Carrera', carreraSchema);