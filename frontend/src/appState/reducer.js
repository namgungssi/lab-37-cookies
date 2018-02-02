import {combineReducers} from 'redux';
import uniformReducer from '../components/Uniform/reducer';
import authReducer from '../components/Authentication/reducer';



export default combineReducers({
  uniforms: uniformReducer,
  auth: authReducer
})
