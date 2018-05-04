/* jshint esversion: 6 */
/* GET home page. */
const posiciones = function (req, res) { 
    res.render('posiciones', { title: 'E-Sports Tournament' });
  };
  
  module.exports = {
    posiciones
  };