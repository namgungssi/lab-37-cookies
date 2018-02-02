import React from 'react';
import Enzyme, {simulate, mount, shallow} from 'enzyme';
import uuid from 'uuid/v1';
import uniformReducer from '../components/Uniform/reducer';



describe('uniform reducer tests', () => {
  let uniform = {name: 'seahawks', description: 'blue green', id: uuid()};
  let state =[];

  test('add a new uniform', () => {
    let action = {type: 'UNIFORM_ADD', payload: uniform};
    state = uniformReducer(state, action);

    expect(state.length).toEqual(1);
    expect(state[0].description).toEqual(uniform.description);
    expect(state[0].name).toEqual(uniform.name);
  });



  test('update a uniform', () => {
    let newuniform = {name: 'seahawks away', description: 'blue white' };

    state = uniformReducer(state, {
      type: 'UNIFORM_UPDATE',
      payload: {
        id: uniform.id,
        name: newuniform.name,
        description: newuniform.description,
      }
    });

    expect(state[0].name).toEqual('seahawks away');
    expect(state[0].description).toEqual('blue white');
    expect(state[0].id).toEqual(uniform.id);
  });


  test('delete a uniform', () => {
    let uniform1 = {name: 'la', description: 'rams', id: uuid()};
    let uniform2 = {name: 'arizona', description: 'cardinals', id: uuid()};

    state = [{...uniform1}, {...uniform2}];

    state = uniformReducer(state, {
      type: 'UNIFORM_DESTROY',
      payload: uniform2.id
    });

    expect(state.length).toEqual(1);
    expect(state[0].name).toEqual('la');
    expect(state[0].description).toEqual('rams');
  });
});
