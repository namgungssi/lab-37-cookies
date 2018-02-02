'use strict';



const request = require('superagent');
const Accessory = require('../models/accessory');
//Include uniform model to test the reference to accessory
require('../models/uniform');
const mongoose = require('mongoose');
const expect = require('expect');



process.env.DB_URL = 'mongodb://localhost:27017/accessory_stg';
process.env.PORT = 5000;



beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Accessory.remove({});
});


afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

let accessoryID = '';


describe('POST /api/1.0/accessory', () => {
  test('it should create a new accessory', () => {
    return request
      .post('localhost:5000/api/1.0/accessory')
      .send({parts: ['helmet', 'ball', 'shoes']})
      .then((res) => {
        accessoryID = res.body._id;
        expect(res.body.parts).toEqual(['helmet', 'ball', 'shoes']);
        expect(res.body._id).not.toEqual(undefined);
        expect(res.status).toBe(200);
      });
  });


  test('it should create another new accessory', () => {
    return request
      .post('localhost:5000/api/1.0/accessory')
      .send({parts: ['jersey', 'socks', 'bat']})
      .then((res) => {
        expect(res.body.parts).toEqual(['jersey', 'socks', 'bat']);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });
});


describe('GET /api/1.0/accessories', () => {
  test('it should return all accessories if no id is given', () => {
    return request
      .get('localhost:5000/api/1.0/accessories')
      .then(res => {
        expect(res.body[0].parts[0]).toEqual('socks');
        expect(res.body[1].parts[0]).toEqual('bat');
        expect(res.status).toBe(200);
      });
  });


  test('it should get a single accessory with id param', () => {
    return request
      .get(`localhost:5000/api/1.0/accessory/${accessoryID}`)
      .then(res => {
        expect(res.body.parts).toEqual(['jersey', 'socks', 'bat']);
        expect(res.status).toBe(200);
      });
  });


  test('it should return a 404 for invalid id', () => {
    let badID = 12345;
    return request
      .get(`localhost:5000/api/1.0/accessory/${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('missing');
      });
  });
});



describe('PUT /api/1.0/accessory', () => {
  test('it should update with a put when valid ID is given', () => {
    return request
      .put(`localhost:5000/api/1.0/accessory/${accessoryID}`)
      .send({parts: ['jacket', 'visor', 'jersey']})
      .then(res => {
        expect(res.text).toBe('Accessory has been updated!');
        expect(res.status).toEqual(200);
      });
  });

  //Create a uniform and save the reference ObjectId to accessory
  let accRefID = '';

  test('it should create a new uniform', () => {
    return request
      .post('localhost:5000/api/1.0/uniform')
      .send({name: 'seattle', profile: 'soccer'})
      .then((res) => {
        accRefID = res.body.parts;
        expect(res.body.parts).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });


  test('it should update with an acc using the uniform ref ID', () => {
    return request
      .put(`localhost:5000/api/1.0/accessory/${accRefID}`)
      .send({parts: ['seattle', 'basketball']})
      .then(res => {
        expect(res.text).toBe('accessory has been updated!');
        expect(res.status).toEqual(200);
      });
  });


  test('it should return a 400 when no body is provided', () => {
    return request
      .put(`localhost:5000/api/1.0/accessory/${accessoryID}`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('bad request');
      });
  });


  test('it should return a 404 when a bad ID is provided', () => {

    let badID = 0000;

    return request
      .put(`localhost:5000/api/1.0/accessory/${badID}`)
      .send({name: 'code fellows'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('not found');
      });
  });
});


describe('DELETE /api/1.0/accessory/:id', () => {
  test('it should be able to delete a accessory', () => {
    return request
      .delete(`localhost:5000/api/1.0/accessory/${accessoryID}`)
      .then(res => {
        expect(res.text).toEqual('accessory has been deleted');
      });
  });
});
