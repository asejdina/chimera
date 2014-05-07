'use strict';

var traceur = require('traceur');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var heroes = traceur.require(__dirname + '/../routes/heroes.js');

  app.get('/', home.index);
  app.get('/help', home.help);
  app.get('/about', home.about);
  app.get('/heroes', heroes.index);
  app.get('/heroes/new', heroes.new);
  app.get('/heroes/:id', heroes.show);
  app.post('/heroes', heroes.create);
  app.get('/heroes', heroes.sort);
  app.post('/heroes/:id/delete', heroes.destroy);
  console.log('Routes Loaded');
  fn();
}
