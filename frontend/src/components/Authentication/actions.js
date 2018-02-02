import request from 'superagent';
import cookie from 'react-cookies';

let API = `${__API_URL__}`;


export const setToken = (auth) => ({
  type: 'TOKEN_SET',
  payload: auth
})


export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
  payload: auth
})


export const signup = user => (dispatch) => {

  return request.post(`${API}/signup`)
  .withCredentials()
  .send(user)
  .then(res => { console.log('res.body.token is ', res.body.token);
  return dispatch(setToken(res.body.token))
})
}

export const login = (user) => (dispatch) => {

  let token = cookie.load('auth');
  console.log('token is ', token)
  if(token) {
    return dispatch(setToken({token}));
  }

  return request.get(`${API}/login`)
  .withCredentials()
  .auth(user.username, user.password)
  .then(res => { return dispatch(tokenSet(res.body.token)) })
}



export const logout = () => dispatch(removeToken());
