import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import * as reducers from '../reducers';
import rootSaga from '../sagas';

let sagaMiddleware = createSagaMiddleware();
let envCompose = compose;

let middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  envCompose = composeWithDevTools;
  middlewares.push(createLogger());
}

const reducer = combineReducers(reducers);
const store = createStore(reducer, envCompose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;
