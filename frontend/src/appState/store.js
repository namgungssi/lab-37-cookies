import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import logger from './middleware/logger';
import thunk from './middleware/thunk';



export default () => createStore(reducer, applyMiddleware(thunk, logger));
