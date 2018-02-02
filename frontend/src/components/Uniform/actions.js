import request from 'superagent';


let API = `${__API_URL__}`;


export const uniformInitialize = () => dispatch => {
  request.get(`${API}/uniforms`)
  .then(res => dispatch(initAction(res.body)))
  .catch(console.error);
}


export const createUniform = payload => dispatch => {
  console.log('payload is ', payload);
  request.post(`${API}/uniforms`)
  .send(payload)
  .then(res => dispatch(create(res.body)))
  .catch(console.error);
};


export const updateUniform = payload => dispatch => {
  request.put(`${API}/uniform/${payload._id}`)
  .send(payload)
  .then(res => {
    dispatch(update(res.body));
    location.reload();
  })
  .catch(console.error);
};


export const deleteUniform = payload => dispatch => {

  let id = payload;

  request.delete(`${API}/uniform/${payload}`)
  .send(id)
  .then(res => {
    dispatch(destroy(id));
    location.reload();
  })
  .catch(console.error);
}


const initAction = list => ({
  type: 'INIT',
  payload: list
});


const create = uniform => ({
  type:"UNIFORM_ADD",
  payload: uniform
});


const update = uniform => ({
  type: "UNIFORM_UPDATE",
  payload: uniform
});


const destroy = uniform => ({
  type: "UNIFORM_DESTROY",
  payload: uniform
});
