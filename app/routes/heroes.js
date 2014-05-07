'use strict';

var Mongo = require('mongodb');

exports.index = (req, res)=>{
  var heroes = global.nss.db.collection('heroes');

  heroes.find().toArray((err, records)=>{
    res.render('heroes/index', {heroes: records, title: 'Hero Creator: Hero'});
  });
};

exports.show = (req, res)=>{
  var heroes = global.nss.db.collection('heroes');
  var _id = Mongo.ObjectID(req.params.id);

  heroes.findOne({_id:_id}, (err, record)=>{
      res.render('heroes/show', {hero: record, title: 'Hero Creator: Hero'});
  });
};

exports.new = (req, res)=>{
  res.render('heroes/new', {title: 'Hero Creator: New Hero'});
};

exports.destroy = (req, res)=>{
  var heroes = global.nss.db.collection('heroes');
  var _id = Mongo.ObjectID(req.params.id);

  heroes.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/heroes');
  });
};




// exports.sort = (req, res)=>{
//   var head;
//   var bod;
//   var legs;
//
//   switch(req.query.position){
//     case 'head':
//       head = heroes.photoHead;
//       break;
//     case 'body':
//       bod = heroes.photoBod;
//       break;
//     case 'legs':
//       legs = heroes.photoLegs;
//   }
//
//   switch(req.query.armor){
//     case 'Iron Man':
//       break;
//     case 'Captain America':
//       break;
//     case 'Deadpool':
//       break;
//     case 'Wolverine':
//       break;
//   }
//
//   var heroes = global.nss.db.collection('heroes');
// //
// // head.substring(0,1)
// //
//
// };
//



exports.create = (req, res)=>{
  var photoHead;
  var photoBod;
  var photoLegs;

  switch(req.body.head){
    case 'Captain America':
      photoHead = 'cap_head.png';
      break;
    case 'Deadpool':
      photoHead = 'dp_head.png';
      break;
    case 'Iron Man':
      photoHead = 'stark_head.png';
      break;
    case 'Wolverine':
      photoHead = 'logan_head.png';
  }

  switch(req.body.bod){
  case 'Captain America':
      photoBod = 'cap_bod.png';
      break;
    case 'Deadpool':
      photoBod = 'dp_bod.png';
      break;
    case 'Iron Man':
      photoBod = 'stark_body.png';
      break;
    case 'Wolverine':
      photoBod = 'logan_body.png';
  }

  switch(req.body.legs){
  case 'Captain America':
      photoLegs = 'cap_legs.png';
      break;
    case 'Deadpool':
      photoLegs = 'dp_legs.png';
      break;
    case 'Iron Man':
      photoLegs = 'stark_legs.png';
      break;
    case 'Wolverine':
      photoLegs = 'logan_legs.png';
  }

  var heroes = global.nss.db.collection('heroes');

  req.body.photoHead = photoHead;
    heroes.save(req.body, (err, obj)=>{
      res.redirect(`/heroes/${obj._id}`);
    });

  req.body.photoBod = photoBod;
    heroes.save(req.body, (err, obj)=>{
      res.redirect(`/heroes/${obj._id}`);
    });

  req.body.photoLegs = photoLegs;
    heroes.save(req.body, (err, obj)=>{
      res.redirect(`/heroes/${obj._id}`);
    });

};
