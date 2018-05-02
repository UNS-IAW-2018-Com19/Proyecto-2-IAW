/* jshint esversion: 6 */
/* GET home page. */
const index = function (req, res) { 
    res.render('index', { title: 'E-Sports Tournament' });
  };
  
  module.exports = {
    index
  };