import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './reducer';
import RootSaga from './saga';

const sagaMiddleware = createSagaMiddleware({
  context: {}
});

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);

(module as any).host?.accept();

export default store;
