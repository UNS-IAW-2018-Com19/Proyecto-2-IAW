/* jshint esversion: 6 */
/* GET home page. */
const index = function (req, res) { 
    res.render('index', { title: 'E-Sports Tournament', user: req.user});
  };
  
  module.exports = {
    index
  };