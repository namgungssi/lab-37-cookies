'use strict';



const Accessory = require(__dirname + '/../models/accessory');
const jsonParser = require('body-parser').json();
const express = require('express');
const accessoryRouter = module.exports = express.Router();



accessoryRouter.get('/accessories', (req, res, next) => {
  let cosObj = req.params || {};
  Accessory.find(cosObj)
    .then(accessory => res.send(accessory))
    .catch(err => next({statusCode: 500, error: err}));
});


accessoryRouter.get('/accessory/:id', (req, res, next) => {
  Accessory.findOne({_id: req.params.id})
    .then(accessory => res.send(accessory))
    .catch(err => next({statusCode: 404, message: 'missing', error: err}));
});


accessoryRouter.post('/accessory', jsonParser, (req, res, next) => {

  let newAccessory = new Accessory(req.body);

  newAccessory.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 400, message: 'missing', error: err}));
});


accessoryRouter.put('/accessory/:id', jsonParser, (req, res, next) => {
  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'bad request'});
  }
  delete req.body._id;
  Accessory.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('accessory has been updated!'))
    .catch(err => next({statusCode: 404, message: 'bad request', error: err}));
});


accessoryRouter.patch('/accessory/:id', jsonParser, (req, res, next) => {
  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'bad request'});
  }
  delete req.body._id;
  Accessory.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(() => res.send('accessory has been updated!'))
    .catch(err => next({statusCode: 404, message: 'bad request', error: err}));
});


accessoryRouter.delete('/accessory/:id', (req, res, next) => {
  Accessory.remove({_id: req.params.id})
    .then(() => res.send('accessory has been deleted'))
    .catch(err => next({statusCode: 500, error: err}));
});
