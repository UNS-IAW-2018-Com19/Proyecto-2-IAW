/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();
const middleware = require('../auth/middleware');
const equiposApi = require('../controllers/equiposApi');
const carrerasApi = require('../controllers/carrerasApi');
const jugadoresApi = require('../controllers/jugadoresApi');
const ctrlEstilo = require('../controllers/estiloController');

/* GET home page. */

router.get('/carreras', carrerasApi.getCarreras);
router.get('/equipos', equiposApi.getEquipos);
router.get('/jugadores', jugadoresApi.getJugadores);
router.post('/estilo', middleware, ctrlEstilo.saveEstilo);
router.get('/estilo', middleware, ctrlEstilo.getEstilo);

module.exports = router;