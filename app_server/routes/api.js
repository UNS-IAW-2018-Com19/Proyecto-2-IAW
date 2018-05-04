/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();
const equiposApi = require('../controllers/equiposApi');
const carrerasApi = require('../controllers/carrerasApi');
const jugadoresApi = require('../controllers/jugadoresApi');

/* GET home page. */

router.get('/carreras', carrerasApi.getCarreras);
router.get('/equipos', equiposApi.getEquipos);
router.get('/jugadores', jugadoresApi.getJugadores);

module.exports = router;