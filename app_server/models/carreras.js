/* jshint esversion: 6 */

const mongoose = require('mongoose');


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
    descripcion: {
      type: String,
      required: true
    },
    completada: {
      type: String,
      required: true
    },
    posiciones: [{ jugador: {
        type: Number,
        required: true
      },
      puntaje: {
        type: Number,
        required: true
      }}],

});

mongoose.model('Carrera', carreraSchema);

