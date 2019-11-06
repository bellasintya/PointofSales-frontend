import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import Reducer from './Reducer/index';

const logger = createLogger ();
const middleware = applyMiddleware (logger, promiseMiddleware);
const store = createStore (Reducer, middleware);

export default store;