'use strict';



const request = require('superagent');
const Uniform = require('../models/uniform');
const mongoose = require('mongoose');
const expect = require('expect');



process.env.DB_URL = 'mongodb://localhost:27017/uniform_stg';
process.env.PORT = 4000;


beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Uniform.remove({});
});


afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

let uniformID = '';


describe('POST /api/1.0/uniform', () => {
  test('it should create a new uniform', () => {
    return request
      .post('localhost:4000/api/1.0/uniform')
      .send({name: 'seattle', profile: 'football'})
      .then((res) => {
        uniformID = res.body._id;
        expect(res.body.name).toBe('seattle');
        expect(res.body.profile).toBe('football');
        expect(res.body.parts).not.toBe(undefined);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });


  test('it should create another new uniform', () => {
    return request
      .post('localhost:4000/api/1.0/uniform')
      .send({
        'name': 'seattle',
        'profile': 'baseball',
      })
      .then((res) => {
        expect(res.body.name).toBe('seattle');
        expect(res.body.profile).toBe('baseball');
        expect(res.body.parts).not.toBe(undefined);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });


  test('it should return a 400 if bad json is given', () => {
    return request
      .post('localhost:4000/api/1.0/uniform')
      .send('portland')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('bad request');
      });
  });
});


describe('GET /api/1.0/uniforms', () => {
  test('it should return all uniforms if no id is given', () => {
    return request
      .get('localhost:4000/api/1.0/uniforms')
      .then(res => {
        expect(res.body[0].name).toBe('seattle');
        expect(res.body[1].name).toBe('seattle');
        expect(res.status).toBe(200);
      });
  });


  test('it should get a single uniform with id param', () => {
    return request
      .get(`localhost:4000/api/1.0/uniform/${uniformID}`)
      .then(res => {
        expect(res.body.name).toBe('seattle');
        expect(res.status).toBe(200);
      });
  });


  test('it should return a 404 for invalid id', () => {
    let badID = 12345;
    return request
      .get(`localhost:4000/api/1.0/uniform/${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('missing');
      });
  });
});


describe('PUT /api/1.0/uniform/:id', () => {
  test('it should update with a put when valid ID is given', () => {
    return request
      .put(`localhost:4000/api/1.0/uniform/${uniformID}`)
      .send({name: 'seattle', profile: 'basketball'})
      .then(res => {
        expect(res.text).toBe('uniform has been updated!');
        expect(res.status).toEqual(200);
      });
  });


  test('it should return a 400 when no body is provided', () => {
    return request
      .put(`localhost:4000/api/1.0/uniform/${uniformID}`)
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
      .put(`localhost:4000/api/1.0/uniform/${badID}`)
      .send({name: 'portland'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('missing');
      });
  });
});


describe('DELETE /api/1.0/uniform/:id', () => {
  test('it should be able to delete a uniform', () => {
    return request
      .delete(`localhost:4000/api/1.0/uniform/${uniformID}`)
      .then(res => {
        expect(res.text).toEqual('uniform has been deleted');
      });
  });
});
