/* jshint esversion: 6 */
var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlPosiciones = require('../controllers/posicionesController');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/posiciones', ctrlPosiciones.posiciones);

module.exports = router;
